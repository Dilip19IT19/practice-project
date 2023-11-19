import { product } from "@/components/ProductsList";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type TCart={
  Products:product[]
  Total:number
}

const savedCarts:product[] = JSON.parse(localStorage.getItem("localCarts") || "[]");


const initialState:TCart={
  Products:savedCarts,
  Total:savedCarts.reduce((acc:number, item:product) => acc + item.price, 0)
}

const cartSlice=createSlice({
  name:"cart",
  initialState:initialState,
  reducers:{

    addToCart:(state,action:PayloadAction<product>)=>{

      state.Products.push(action.payload);
      localStorage.setItem("localCarts",JSON.stringify(state.Products));
      state.Total+=action.payload.price;

    },

    removeFromCart:(state,action:PayloadAction<product>)=>{

      state.Products=state.Products.filter((item)=>item.id!==action.payload.id)
      localStorage.setItem("localCarts",JSON.stringify(state.Products));
      state.Total-=action.payload.price;

    },

  }

})

 const cartReducer= cartSlice.reducer;
 export default cartReducer;

export const {addToCart,removeFromCart} =cartSlice.actions;