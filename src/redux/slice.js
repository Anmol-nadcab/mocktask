import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  walletAddress: 0,
  // webRecord:{},
  // tokenRecord:{},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   setWAlletAddress: (state,action)=>{
    // console.log(state.walletAddress,action.payload.data);
    state.walletAddress = action.payload.data
   },
  //  setWebRecord:(state,action) =>{
  //   state.webRecord = action.payload.data
  //  },setTokenRecord:(state,action) =>{
  //   state.tokenRecord = action.payload.data
  //  }  
  },
})

// Action creators are generated for each case reducer function
export const { setWAlletAddress} = counterSlice.actions

export default counterSlice.reducer