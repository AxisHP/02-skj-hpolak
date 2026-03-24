import { apiRequest } from "./httpClient";
import type { Item, ItemWriteRequest } from "../types/Item";

export function createItem(payload: ItemWriteRequest): Promise<Item> {
  return apiRequest<Item>("/items", { method: "POST", body: payload });
}

export function updateItem(publicId: string, payload: ItemWriteRequest): Promise<Item> {
  return apiRequest<Item>(`/items/${publicId}`, { method: "PUT", body: payload });
}

export function deleteItem(publicId: string): Promise<void> {
  return apiRequest<void>(`/items/${publicId}`, { method: "DELETE" });
}
