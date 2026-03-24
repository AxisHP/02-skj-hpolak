export const UserRole = {
  Guest: 0,
  Customer: 1,
  Admin: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const OrderStatus = {
  InCart: 0,
  Payed: 1,
  GettingReady: 2,
  Delivering: 3,
  Delivered: 4,
  Canceled: 5,
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export function userRoleLabel(role: UserRole): string {
  switch (role) {
    case UserRole.Guest:
      return "Guest";
    case UserRole.Customer:
      return "Customer";
    case UserRole.Admin:
      return "Admin";
    default:
      return "Unknown";
  }
}

export function orderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.InCart:
      return "InCart";
    case OrderStatus.Payed:
      return "Payed";
    case OrderStatus.GettingReady:
      return "GettingReady";
    case OrderStatus.Delivering:
      return "Delivering";
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Canceled:
      return "Canceled";
    default:
      return "Unknown";
  }
}
