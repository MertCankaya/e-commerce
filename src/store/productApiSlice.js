import { createSlice } from "@reduxjs/toolkit";

const productApiSlice = createSlice({
  name: "productApi",
  initialState: {
    keyword: "",
    fetchApiProcess: false,
    apiData: [],
    comments: [],
  },
  reducers: {
    apiKeyword(state, action) {
      state.keyword = action.payload;
    },
    startApiProcess(state) {
      state.fetchApiProcess = true;
    },
    stopApiProcess(state) {
      state.fetchApiProcess = false;
    },
    apiData(state, action) {
      state.apiData = action.payload.items;
    },
    apiComments(state, action) {
      state.comments = action.payload.items;
    },
  },
});

export const apiActions = productApiSlice.actions;
export default productApiSlice;
