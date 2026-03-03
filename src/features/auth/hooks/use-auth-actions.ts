"use client";

import { useMutation } from "@tanstack/react-query";

import { defaultRouteByRole, resolveRole } from "@/config/roles";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { AuthResult } from "@/features/auth/types/auth";
import type { LoginValues, SignupValues, VerifyOtpValues } from "@/features/auth/schemas/auth-schemas";

const resolveAuthRole = (metadata: unknown): AuthResult => {
  const role =
    typeof metadata === "object" && metadata !== null && "role" in metadata
      ? resolveRole((metadata as { role?: unknown }).role)
      : "GUEST";

  return { role };
};

export const useLoginMutation = () => {
  const supabase = createSupabaseBrowserClient();

  return useMutation({
    mutationFn: async (values: LoginValues) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return resolveAuthRole(data.user?.app_metadata ?? data.user?.user_metadata);
    },
  });
};

export const useSignupMutation = () => {
  const supabase = createSupabaseBrowserClient();

  return useMutation({
    mutationFn: async (values: SignupValues) => {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return resolveAuthRole(data.user?.app_metadata ?? data.user?.user_metadata);
    },
  });
};

export const useVerifyOtpMutation = () => {
  const supabase = createSupabaseBrowserClient();

  return useMutation({
    mutationFn: async (values: VerifyOtpValues) => {
      const { data, error } = await supabase.auth.verifyOtp({
        email: values.email,
        token: values.token,
        type: "email",
      });

      if (error) {
        throw new Error(error.message);
      }

      return resolveAuthRole(data.user?.app_metadata ?? data.user?.user_metadata);
    },
  });
};

export const getDefaultRouteForRole = (role: AuthResult["role"]): string => defaultRouteByRole[role];
