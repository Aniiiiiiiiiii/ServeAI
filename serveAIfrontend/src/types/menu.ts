export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  prepTime: string;
  image: string;
  rating: number;
  tags: string[];
  available: boolean;
}
