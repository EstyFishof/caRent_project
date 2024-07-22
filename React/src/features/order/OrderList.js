
import { getAllOrders } from "./OrderApi";
import { useSelector } from "react-redux";
import {Order} from "./Order";

const OrderList = () => {
    let arrOfOrders=useSelector(state=>state.Order.arr);
    console.log(arrOfOrders);
    return ( 
        <div>
            <h1></h1>
            <ul>
                {arrOfOrders.map(item=><li key={item._id}><Order one={item} /></li>)}
            </ul>
        </div>
        
     );
}
 
export default OrderList;