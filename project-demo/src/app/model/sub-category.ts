import {Product} from "./product";

export class SubCategory {
  id: number;
  name: string;
  description: string;
  products: Product[];
  image_url: string;
}
