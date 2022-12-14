import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = { searchTxt: "" };

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    changeSearchTxt(state, action) {
      state.searchTxt = action.payload;
    },
  },
});

const store = configureStore({
  reducer: searchSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export const searchActions = searchSlice.actions;
export default store;
