import {User} from "./user";
import {Payment} from "./payment";
import {Order} from "./order";

export class Invoice {
  id: number;
  number: string;
  invoice_total: number;
  invoice_date: Date;
  due_date: Date;
  payment_date: Date;
  client: User;
  payment: Payment;
  order: Order
}
