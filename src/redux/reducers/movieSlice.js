import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name : 'movie',
    initialState : {
        popularMovies : [],
        topRatedMovies : [],
        upComingMovies : [],
        genreList : []
    },
    reducers : {
        initData : (state, action) => {
            let {type, payload} = action
            state.popularMovies = payload.popular.results
            state.topRatedMovies = payload.topRated.results
            state.upComingMovies = payload.upComing.results
            state.genreList = payload.genre.genres
        }
    }
})


export const MovieReducerActions = movieSlice.actions

export default movieSlice.reducer