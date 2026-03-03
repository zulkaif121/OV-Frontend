import { NextResponse, type NextRequest } from "next/server";

import { isRoleAllowedForPath } from "@/config/route-access";
import { defaultRouteByRole, resolveRole } from "@/config/roles";
import { isUiOnlyMode, resolveUiOnlyRole } from "@/lib/dev-mode";
import { updateSession } from "@/lib/supabase/middleware";

const AUTH_ROUTES = ["/login", "/signup", "/verify-otp"];

const isPublicPath = (pathname: string): boolean => {
  if (AUTH_ROUTES.includes(pathname)) {
    return true;
  }
  if (pathname.startsWith("/jobs/")) {
    return true;
  }
  return false;
};

const createRedirectResponse = (request: NextRequest, response: NextResponse, destination: string): NextResponse => {
  const url = request.nextUrl.clone();
  url.pathname = destination;
  const redirect = NextResponse.redirect(url);
  response.cookies.getAll().forEach(({ name, value }) => {
    redirect.cookies.set(name, value);
  });
  return redirect;
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isUiOnlyMode()) {
    const roleFromQuery = request.nextUrl.searchParams.get("role");
    const roleFromCookie = request.cookies.get("ovi-dev-role")?.value ?? null;
    const resolvedRole = resolveUiOnlyRole(roleFromQuery ?? roleFromCookie);
    const defaultRoute = defaultRouteByRole[resolvedRole];
    const setDevCookies = (response: NextResponse) => {
      response.cookies.set("ovi-dev-role", resolvedRole, {
        path: "/",
        sameSite: "lax",
        httpOnly: false,
      });
      response.cookies.set("ovi-org-id", request.cookies.get("ovi-org-id")?.value ?? "dev-org", {
        path: "/",
        sameSite: "lax",
        httpOnly: false,
      });
      return response;
    };

    if (AUTH_ROUTES.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = defaultRoute;
      return setDevCookies(NextResponse.redirect(url));
    }

    if (!isPublicPath(pathname) && !isRoleAllowedForPath(resolvedRole, pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = defaultRoute;
      return setDevCookies(NextResponse.redirect(url));
    }

    return setDevCookies(NextResponse.next());
  }

  const { response, user } = await updateSession(request);

  const role = resolveRole(user?.app_metadata?.role ?? user?.user_metadata?.role);
  const orgId =
    (typeof user?.app_metadata?.org_id === "string" && user.app_metadata.org_id) ||
    (typeof user?.user_metadata?.org_id === "string" && user.user_metadata.org_id) ||
    null;

  if (orgId) {
    response.cookies.set("ovi-org-id", orgId, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
  }

  if (!user && !isPublicPath(pathname)) {
    return createRedirectResponse(request, response, "/login");
  }

  if (user && AUTH_ROUTES.includes(pathname)) {
    return createRedirectResponse(request, response, defaultRouteByRole[role]);
  }

  if (user && !isPublicPath(pathname) && !isRoleAllowedForPath(role, pathname)) {
    return createRedirectResponse(request, response, defaultRouteByRole[role]);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
