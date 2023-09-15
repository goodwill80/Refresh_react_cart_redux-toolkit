import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: [...cartItems],
  amount: 5,
  total: 0,
  isLoading: true,
};

// Reducer actions - "No more reference error" we no longer need to return a new state due to immer library which do all the heavy lifting
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// console.log(cartSlice);

// To be imported into store
export default cartSlice.reducer;
// To be imported into components that need to execute the despatch
export const { clearCart } = cartSlice.actions;
