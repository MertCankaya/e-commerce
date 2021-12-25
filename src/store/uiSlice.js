import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { payment: false, spinner: false },
  reducers: {
    openPayment(state) {
      state.payment = true;
    },
    closePayment(state) {
      state.payment = false;
    },
    openSpinner(state) {
      state.spinner = true;
    },
    closeSpinner(state) {
      state.spinner = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
