import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered,  } from "../cake/cakeSlice";

const initialState = {
  numOfIceCream: 20,
};

const incecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIceCream--;
    },
    restocked: (state, actions) => {
      state.numOfIceCream += actions.payload;
    },
  },
//   extraReducers: {
//     ['cake/ordered']: (state) => {
//         state.numOfIceCream--
//     }
//   }
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, state => {
        state.numOfIceCream--
    })
  }
});


export default incecreamSlice.reducer;
export const {ordered, restocked} = incecreamSlice.actions;