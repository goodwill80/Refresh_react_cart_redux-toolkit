import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import cartItems from '../../cartItems';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';

// URL
const url = 'https://course-api.com/react-useReducer-cart-project';

// Initial State
const initialState = {
  cartItems: [],
  amount: 5,
  total: 0,
  isLoading: true,
};

// API fetch using asyncThunk
export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  // Can have 2 parameters
  async (testing, thunkAPI) => {
    try {
      // You can pass in args
      console.log(testing);
      // You can retrieve the thunk object which has lots of valuable roperties
      console.log(thunkAPI);
      // You can access all the states in the entire redux store
      console.log(thunkAPI.getState());
      // You can also perform dispatch here
      //  thunkAPI.dispatch(openModal());
      // Call API to return the data
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong!');
    }
  }
);

// Reducer actions - "No more reference error" we no longer need to return a new state due to immer library which do all the heavy lifting
const cartSlice = createSlice({
  name: 'cart',
  initialState,

  // Local State Management
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    // This will be implemented using useEffect
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  // State Management via API AsyncThunk
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice);

// To be imported into store
export default cartSlice.reducer;
// To be imported into components that need to execute the despatch
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
