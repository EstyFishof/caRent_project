import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: 'all',

};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    
  },
});

export const { setSelectedCategory } = ProductSlice.actions;
export default ProductSlice.reducer;