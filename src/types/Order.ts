import type { OrderStatus } from "./enums";

export interface OrderItem {
  publicId: string;
  itemPublicId: string;
  itemName: string;
  quantity: number;
  price: number;
}

export interface Order {
  publicId: string;
  userPublicId: string;
  userName: string;
  items: OrderItem[];
  totalAmount: number;
  orderDate: string;
  status: OrderStatus;
}
