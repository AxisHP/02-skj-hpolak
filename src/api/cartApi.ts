import { apiRequest } from "./httpClient";
import type { CartSummary } from "../types/Cart";

export function getCart(userPublicId: string): Promise<CartSummary> {
  return apiRequest<CartSummary>(`/users/${userPublicId}/cart`);
}

export function addToCart(userPublicId: string, itemPublicId: string, quantity: number): Promise<{ success: boolean; errorMessage?: string }> {
  return apiRequest<{ success: boolean; errorMessage?: string }>(`/users/${userPublicId}/cart/items`, {
    method: "POST",
    body: { itemPublicId, quantity },
  });
}

export function updateCartItem(userPublicId: string, itemPublicId: string, quantity: number): Promise<{ success: boolean; errorMessage?: string }> {
  return apiRequest<{ success: boolean; errorMessage?: string }>(`/users/${userPublicId}/cart/items/${itemPublicId}`, {
    method: "PUT",
    body: { quantity },
  });
}

export function removeFromCart(userPublicId: string, itemPublicId: string): Promise<void> {
  return apiRequest<void>(`/users/${userPublicId}/cart/items/${itemPublicId}`, { method: "DELETE" });
}

export function clearCart(userPublicId: string): Promise<void> {
  return apiRequest<void>(`/users/${userPublicId}/cart`, { method: "DELETE" });
}

export function checkout(userPublicId: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/users/${userPublicId}/cart/checkout`, { method: "POST" });
}
