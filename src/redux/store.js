import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice'
import logger from 'redux-logger'

export default configureStore({
    reducer : {
        movie : movieReducer
    },
    middlewware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})