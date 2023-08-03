import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularFilmList: []
}

const filmDataSlice = createSlice({
  name: "filmData",
  initialState,
  reducers: {
    setPopularFilmList: (state, action) => {
      state.popularFilmList = action.payload;
    }
  }
})

export const store = configureStore({
  reducer: filmDataSlice.reducer,
});

export const setPopularFilmActions = filmDataSlice.actions;

export default filmDataSlice.reducer;