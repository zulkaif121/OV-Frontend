"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { AuthCardShell } from "@/features/auth/components/auth-card-shell";
import { getDefaultRouteForRole, useLoginMutation } from "@/features/auth/hooks/use-auth-actions";
import { loginSchema, type LoginValues } from "@/features/auth/schemas/auth-schemas";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const isDevelopment = process.env.NODE_ENV !== "production";
const devEmail = process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL ?? "ui-dev@local.ovi";
const devPassword = process.env.NEXT_PUBLIC_DEV_LOGIN_PASSWORD ?? "dev-password";

export const LoginForm = () => {
  const router = useRouter();
  const mutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: isDevelopment ? devEmail : "",
      password: isDevelopment ? devPassword : "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await mutation.mutateAsync(values);
    router.push(getDefaultRouteForRole(result.role));
  });

  return (
    <AuthCardShell title="Welcome back" description="Sign in to access OVI operations.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" autoComplete="current-password" {...register("password")} />
          {errors.password ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.password.message}</p> : null}
        </div>

        {mutation.error ? <p className="text-xs text-[hsl(var(--destructive))]">{mutation.error.message}</p> : null}

        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
        Need an account? <Link className="font-medium text-[hsl(var(--primary))]" href="/signup">Sign up</Link>
      </p>
    </AuthCardShell>
  );
};
