export interface Item {
  publicId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
}

export interface ItemWriteRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
}
