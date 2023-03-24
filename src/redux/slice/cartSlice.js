import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
  ? JSON.parse(localStorage.getItem("cartTotalAmount"))
  : [],
  previousURL: "",
  savelater: localStorage.getItem("savelater")
    ? JSON.parse(localStorage.getItem("savelater"))
    : [],
   
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
         
              
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, {
          position: "top-left",
        });
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`, {
          position: "top-left",
        });
      }
      
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      console.log(state.cartItems)
    },
    DECREASE_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by one`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} removed from cart`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("savelater", JSON.stringify(state.savelater));
    },
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} removed from cart`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    
    },
    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
      localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
    SAVE_FOR_LATER(state, action) {

      //console.log(action.payload);
      const tempProduct = { ...action.payload };
      state.savelater.push(tempProduct);
      // const newCartItem = action.payload;
      
      // const newCartItem2=[{action.payload},...newCartItem]
    
      
      
       /* const newCartItem3 = state.savelater.filter(
          (item) => item.id === action.payload.id
        ); */
      // //console.log(newCartItem)
       
     

      //state.savelater =  newCartItem3;
      toast.success(`${action.payload.name} add to save list`, {
        position: "top-left",
      });

      localStorage.setItem("savelater", JSON.stringify(state.savelater));
    },

    SAVE_FOR_LATER_MOVE_CART(state, action)
    
    {

      
      const tempProduct = { ...action.payload, cartQuantity: 1 };
      
      state.cartItems.push(tempProduct);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.name} added to cart`, {
        position: "top-left",
      });
     
      
    },
    REMOVE_SAVE_FOR_LATER(state, action)

    {
      const newSaveLater = state.savelater.filter(
        (item) => item.id !== action.payload.id
      );

      state.savelater = newSaveLater;
      toast.success(`${action.payload.name} removed from Saved List`, {
        position: "top-left",
      });

      localStorage.setItem("savelater", JSON.stringify(state.savelater));

    }
  },
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
  SAVE_FOR_LATER,
  SAVE_FOR_LATER_MOVE_CART,
  REMOVE_SAVE_FOR_LATER
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectSaveLaterItem = (state) => state.cart.savelater;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;