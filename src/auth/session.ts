import type { User } from "../types/User";
import { UserRole } from "../types/enums";

const SESSION_KEY = "apf.currentUser";

export function getCurrentUser(): User | null {
  const value = localStorage.getItem(SESSION_KEY);
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as User;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearCurrentUser(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isAdmin(user: User | null): boolean {
  return user?.role === UserRole.Admin;
}
