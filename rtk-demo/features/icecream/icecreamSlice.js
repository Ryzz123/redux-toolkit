const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

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
    builder.addCase(cakeActions.ordered, state => {
        state.numOfIceCream--
    })
  }
});


module.exports = incecreamSlice.reducer;
module.exports.icecreamActions = incecreamSlice.actions;