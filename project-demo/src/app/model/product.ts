import {Images} from "./images";
import {SubCategory} from "./sub-category";

export class Product {
  id:number;
  name:string;
  price: number;
  description: string;
  quantity: number;
  images: Images[];
  publishedIn: Date;
  image_url: string;
  products: Product[];
  subcategory: SubCategory[];
  category_id: string;
}
