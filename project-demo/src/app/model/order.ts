import {OrderStatus} from "../enums/order-status.enum";
import {User} from "./user";
import {OrderItem} from "./order-item";
import {Invoice} from "./invoice";

export class Order {
  id: number;
  order_date: Date;
  status: OrderStatus;
  shipmentDate: Date;
  comment: string;
  shippedTo: string;
  user: User;
  order_item: OrderItem[];
  invoice: Invoice;
  invoiceId: number;
}
