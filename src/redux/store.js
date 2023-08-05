import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import counterReducer from './slice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    serializableCheck: false
  },
})