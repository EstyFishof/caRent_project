
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  basket: [],
  countProduct: 0,
  sumPrice: 0,
  address: "",
  showSmallBasket:false
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const { one, numOfProduct = 1 } = action.payload;

      const existingProductIndex = state.basket.findIndex(item => item._id === one._id);
      if (existingProductIndex !== -1) {
        state.basket[existingProductIndex].quantity += numOfProduct;
      } else {

        one.quantity = numOfProduct;
        state.basket.push(one);
      }
      state.countProduct += numOfProduct;
      state.sumPrice += numOfProduct * one.price;
      localStorage.setItem("basket", JSON.stringify(state.basket));
      setShowSmallBasket(true) 
    },

    setBasket: (state, action) => {
      state.basket = action.payload;
    },

    removeFromBasket: (state, action) => {
      const { one, numOfProduct } = action.payload;

      const existingProductIndex = state.basket.findIndex(item => item._id === one._id);
      if (existingProductIndex !== -1) {
        state.basket[existingProductIndex].quantity -= numOfProduct;
      } else {
        one.quantity = numOfProduct;
        state.basket.removeItem(one);
      }
      state.countProduct -= numOfProduct;
      state.sumPrice -= numOfProduct * one.price;
      localStorage.removeItem("basket");
    },
    removeBasket: (state) => {
      state.basket = [];
      state.countProduct = 0;
      state.sumPrice = 0;
      state.address = "";
      state.showSmallBasket = false;
      localStorage.removeItem("basket");
    },

    UpdateQty: (state, action) => {
      const { productId, qty } = action.payload;
      const productToUpdate = state.basket.find(item => item._id === productId);
      let sumPrice = useSelector(state => state.order.sumPrice);
      if (productToUpdate && action.payload.qty > 0) {
        productToUpdate.qty = qty;
        console.log(productToUpdate.qty);
        state.finalPrice = sumPrice(state.basket)
      }
    },
    finalPriceFunc: (state, action) => {
      state.finalPrice = action.payload.finalPrice;
      console.log(`price------->${state.finalPrice}`);

    },
    finalProductFunc:(state,action)=>{
        let x=action.payload.finalProduct;
        console.log(`---->>>>${x}`);
    },
    setShowSmallBasket: (state, action) => {
      state.showSmallBasket = action.payload;
      console.log(state.showSmallBasket);

    },



  }
},

);
export const { addToBasket, removeFromBasket, removeBasket, setBasket, setShowSmallBasket,UpdateQty,finalProductFunc } = orderSlice.actions;
export default orderSlice.reducer;


