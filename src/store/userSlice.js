import { createSlice } from '@reduxjs/toolkit'


let user =  createSlice({
  name : 'user',
  initialState : {name :'kim', age : 20 },
  reducers : {
    changName(state){
      state.name = 'park'
    },
    increase(state, action){
      state.age += action.payload 
    },
  }      
})
export let { changName, increase } = user.actions

export default user