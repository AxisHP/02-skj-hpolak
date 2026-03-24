import { apiRequest } from "./httpClient";
import type { LoginRequest, RegisterRequest, User } from "../types/User";

export function login(payload: LoginRequest): Promise<User> {
  return apiRequest<User>("/auth/login", { method: "POST", body: payload });
}

export function register(payload: RegisterRequest): Promise<User> {
  return apiRequest<User>("/auth/register", { method: "POST", body: payload });
}

export function getAuthUser(publicId: string): Promise<User> {
  return apiRequest<User>(`/auth/users/${publicId}`);
}
