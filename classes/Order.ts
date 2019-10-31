import { OrderBuilder} from "./OrderBuilder";

export class Order extends Entity{
    description: string;
    price: number;
    UserId: string;
    PaymentMethod: PaymentMethodEnum;
    payed: boolean;

    constructor(OrderBuilder: OrderB){

    }
    
}