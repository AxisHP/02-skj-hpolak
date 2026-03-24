import { apiRequest } from "./httpClient";
import type { Favourite } from "../types/Favourite";

export function getFavourites(userPublicId: string): Promise<Favourite[]> {
  return apiRequest<Favourite[]>(`/users/${userPublicId}/favourites`);
}

export function addFavourite(userPublicId: string, itemPublicId: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/users/${userPublicId}/favourites/${itemPublicId}`, { method: "POST" });
}

export function removeFavourite(userPublicId: string, itemPublicId: string): Promise<void> {
  return apiRequest<void>(`/users/${userPublicId}/favourites/${itemPublicId}`, { method: "DELETE" });
}
