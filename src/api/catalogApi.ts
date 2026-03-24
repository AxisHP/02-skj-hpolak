import { apiRequest } from "./httpClient";
import type { Item } from "../types/Item";
import type { Category } from "../types/Category";

export function getItems(categoryId?: string): Promise<Item[]> {
  const query = categoryId ? `?categoryId=${encodeURIComponent(categoryId)}` : "";
  return apiRequest<Item[]>(`/catalog/items${query}`);
}

export function getItem(publicId: string): Promise<Item> {
  return apiRequest<Item>(`/catalog/items/${publicId}`);
}

export function getCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/catalog/categories");
}

export function getCategory(publicId: string): Promise<Category> {
  return apiRequest<Category>(`/catalog/categories/${publicId}`);
}
