import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null
  },
  reducers: {
    addToken: (state, action) => {
      state.value = action.payload;
    },
    removeToken: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
