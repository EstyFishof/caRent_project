
import axios from "axios";

let baseUrl = "http://localhost:5000/api/orders";
export const saveOrderInServer = (products, user, addressOrder) => {
  let body = {
    "products": products,
    // "_id":user._id,
    "addressOrder": addressOrder
    };
  let header = {headers: {"access-token": user.token,},};
  return axios.post(baseUrl, body, header);
};





