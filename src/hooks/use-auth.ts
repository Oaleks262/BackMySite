"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { username: string } | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();

      setState({
        isAuthenticated: data.authenticated,
        isLoading: false,
        user: data.user || null,
      });

      return data.authenticated;
    } catch {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      return false;
    }
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          setState({
            isAuthenticated: true,
            isLoading: false,
            user: { username },
          });
          router.push("/admin");
          return { success: true };
        }

        return { success: false, error: data.message || "Помилка авторизації" };
      } catch {
        return { success: false, error: "Помилка з'єднання" };
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
      router.push("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    ...state,
    login,
    logout,
    checkAuth,
  };
}
