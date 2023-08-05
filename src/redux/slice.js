import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  walletAddress: 0,
  webRecord:{},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   setWAlletAddress: (state,action)=>{
    // console.log(state.walletAddress,action.payload.data);
    state.walletAddress = action.payload.data
   },
   setWebRecord:(state,action) =>{
    state.webRecord = action.payload.data
   } 
  },
})

// Action creators are generated for each case reducer function
export const { setWAlletAddress,setWebRecord } = counterSlice.actions

export default counterSlice.reducer