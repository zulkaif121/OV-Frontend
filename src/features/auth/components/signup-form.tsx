"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { AuthCardShell } from "@/features/auth/components/auth-card-shell";
import { useSignupMutation } from "@/features/auth/hooks/use-auth-actions";
import { signupSchema, type SignupValues } from "@/features/auth/schemas/auth-schemas";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export const SignupForm = () => {
  const router = useRouter();
  const mutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    router.push(`/verify-otp?email=${encodeURIComponent(values.email)}`);
  });

  return (
    <AuthCardShell title="Create account" description="Set up your OVI organization access.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.email.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input id="signup-password" type="password" autoComplete="new-password" {...register("password")} />
          {errors.password ? <p className="text-xs text-[hsl(var(--destructive))]">{errors.password.message}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <Input id="signup-confirm-password" type="password" autoComplete="new-password" {...register("confirmPassword")} />
          {errors.confirmPassword ? (
            <p className="text-xs text-[hsl(var(--destructive))]">{errors.confirmPassword.message}</p>
          ) : null}
        </div>

        {mutation.error ? <p className="text-xs text-[hsl(var(--destructive))]">{mutation.error.message}</p> : null}

        <Button className="w-full" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
        Already have an account? <Link className="font-medium text-[hsl(var(--primary))]" href="/login">Sign in</Link>
      </p>
    </AuthCardShell>
  );
};
