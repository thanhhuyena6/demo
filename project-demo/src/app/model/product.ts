import {Images} from "./images";
import {SubCategory} from "./sub-category";
import {Category} from "./category";
import {CartItem} from "./cart-item";
import {OrderItem} from "./order-item";

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
  product: Product;
  categories: Category;
  addedToCart: boolean;
  cartQuantity: number;
  cartItem: CartItem;
  order_items: OrderItem[];
}
