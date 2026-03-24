import { apiRequest } from "./httpClient";
import type { Order } from "../types/Order";
import type { OrderStatus } from "../types/enums";

export function getUserOrders(userPublicId: string): Promise<Order[]> {
  return apiRequest<Order[]>(`/users/${userPublicId}/orders`);
}

export function getUserOrderDetails(userPublicId: string, orderPublicId: string): Promise<Order> {
  return apiRequest<Order>(`/users/${userPublicId}/orders/${orderPublicId}`);
}

export function getAdminOrders(): Promise<Order[]> {
  return apiRequest<Order[]>("/admin/orders");
}

export function getAdminOrderDetails(orderPublicId: string): Promise<Order> {
  return apiRequest<Order>(`/admin/orders/${orderPublicId}`);
}

export function updateOrderStatus(orderPublicId: string, status: OrderStatus): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/admin/orders/${orderPublicId}/status`, {
    method: "PUT",
    body: { status },
  });
}

export function cancelOrder(orderPublicId: string): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/admin/orders/${orderPublicId}/cancel`, { method: "POST" });
}
