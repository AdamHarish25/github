"use client";
import { useUser, type UserHookResult } from "@/firebase";

/**
 * @deprecated useUser from @/firebase instead
 */
export function useAuth(): UserHookResult {
  const { user, isUserLoading, userError } = useUser();
  return { user, loading: isUserLoading, error: userError };
}
