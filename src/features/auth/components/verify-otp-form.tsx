"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { AuthCardShell } from "@/features/auth/components/auth-card-shell";
import { getDefaultRouteForRole, useVerifyOtpMutation } from "@/features/auth/hooks/use-auth-actions";
import { verifyOtpSchema, type VerifyOtpValues } from "@/features/auth/schemas/auth-schemas";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export const VerifyOtpForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mutation = useVerifyOtpMutation();
  const email = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      token: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await mutation.mutateAsync(values);
    router.push(getDefaultRouteForRole(result.role));
  });

  return (
    <AuthCardShell title="Verify access" description="Enter the 6-digit OTP from your email.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="otp-email">Email</Label>
          <Input id="otp-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp-token">OTP Code</Label>
          <Input id="otp-token" inputMode="numeric" maxLength={6} autoComplete="one-time-code" {...register("token")} />
          {errors.token ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.token.message}</p> : null}
        </div>

        {mutation.error ? <p className="text-xs text-[hsl(var(--destructive))]">{mutation.error.message}</p> : null}

        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
        Need a new account? <Link className="font-medium text-[hsl(var(--primary))]" href="/signup">Sign up</Link>
      </p>
    </AuthCardShell>
  );
};
