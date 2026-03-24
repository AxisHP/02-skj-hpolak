export interface CartItem {
  publicId: string;
  userPublicId: string;
  itemPublicId: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  total: number;
  count: number;
}
