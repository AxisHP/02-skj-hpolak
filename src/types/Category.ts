export interface Category {
  publicId: string;
  name: string;
  description: string;
}

export interface CategoryWriteRequest {
  name: string;
  description: string;
}
