import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import productApiSlice from "./productApiSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
    productApi: productApiSlice.reducer,
    order: orderSlice.reducer
  },
});

export default store;
