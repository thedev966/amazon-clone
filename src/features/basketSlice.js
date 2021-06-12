import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },

    emptyBasket: (state, action) => {
      state.basket = [];
    },

    removeFromBasket: (state, action) => {
      let index = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.basket.splice(index, 1);
      } else {
        console.log("errror");
      }
    },
  },
});

export const calculateTotalPrice = (basket) => {
  let total = 0;

  basket.forEach((item) => {
    total += item.price;
  });
  return total;
};

export const {
  addToBasket,
  removeFromBasket,
  emptyBasket,
} = basketSlice.actions;

export const selectBasket = (state) => state.basket.basket;

export default basketSlice.reducer;
