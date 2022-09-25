import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      //to check  if item  is already  available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.totalQuantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          totalQuantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.itemsList.find((item) => item.id === id);
      if (existingItem.totalQuantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
      } else {
        existingItem.totalQuantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
