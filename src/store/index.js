import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovieList: []
}

const movieDataSlice = createSlice({
  name: "movieData",
  initialState,
  reducers: {
    setPopularMovieList: (state, action) => {
      state.popularMovieList = action.payload;
    }
  }
})

export const store = configureStore({
  reducer: movieDataSlice.reducer,
});

export const setPopularMovieActions = movieDataSlice.actions;

export default movieDataSlice.reducer;