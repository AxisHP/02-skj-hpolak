import { apiRequest } from "./httpClient";
import type { Category, CategoryWriteRequest } from "../types/Category";

export function createCategory(payload: CategoryWriteRequest): Promise<Category> {
  return apiRequest<Category>("/categories", { method: "POST", body: payload });
}

export function updateCategory(publicId: string, payload: CategoryWriteRequest): Promise<Category> {
  return apiRequest<Category>(`/categories/${publicId}`, { method: "PUT", body: payload });
}

export function deleteCategory(publicId: string): Promise<void> {
  return apiRequest<void>(`/categories/${publicId}`, { method: "DELETE" });
}
