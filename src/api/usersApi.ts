import { apiRequest } from "./httpClient";
import type { User, UserCreateRequest, UserUpdateRequest } from "../types/User";

export function getUsers(): Promise<User[]> {
  return apiRequest<User[]>("/users");
}

export function getUser(publicId: string): Promise<User> {
  return apiRequest<User>(`/users/${publicId}`);
}

export function createUser(payload: UserCreateRequest): Promise<User> {
  return apiRequest<User>("/users", { method: "POST", body: payload });
}

export function updateUser(publicId: string, payload: UserUpdateRequest): Promise<User> {
  return apiRequest<User>(`/users/${publicId}`, { method: "PUT", body: payload });
}

export function deleteUser(publicId: string): Promise<void> {
  return apiRequest<void>(`/users/${publicId}`, { method: "DELETE" });
}

export function deleteUsers(publicIds: string[]): Promise<void> {
  return apiRequest<void>("/users/delete-range", { method: "POST", body: publicIds });
}

export function resetPassword(publicId: string, newPassword: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/users/${publicId}/reset-password`, {
    method: "POST",
    body: { newPassword },
  });
}
