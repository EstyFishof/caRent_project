import { configureStore } from "@reduxjs/toolkit";
// import ProductSlice from "../features/product/ProductSlice";
import userSlice from "../features/user/userSlice";
import OrderSlice from "../features/order/OrderSlice";
import ProductSlice from "../features/product/ProductSlice";


export const store = configureStore({
    reducer:{
        product:ProductSlice,
        user:userSlice,
        order:OrderSlice

    }
})