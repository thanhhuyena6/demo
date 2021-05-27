import {Product} from "./product";
import {SubCategory} from "./sub-category";
// import {CategoryType} from "../enums/category-type.enum";

export class Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  products: Product[];
  subcategory: SubCategory[];
  products_count: number;
}
