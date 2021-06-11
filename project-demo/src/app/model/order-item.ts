import {Product} from "./product";
import {Order} from "./order";

export class OrderItem {
  id: number;
  unit_price: number;
  quantity: number;
  total_price: number;
  product: Product;
  order: Order;
  productId: number;
  orderId: number;
}
