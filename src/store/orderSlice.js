import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    replaceOrder(state, action) {
      state.orders = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
