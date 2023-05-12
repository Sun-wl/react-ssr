import { createSlice } from '@reduxjs/toolkit'
import createInitialState from '../initialStates/homeInitialState'

export const homeSlice = createSlice({
  name: 'home',
  initialState: createInitialState(),
  reducers: {
    updateNotification: (state, action) => {
      return {
        ...state,
        showNotification: action.payload
      }
    },
    disableNotification: (state) => {
      return {
        ...state,
        showNotification: false
      }
    },
  }
})

export const { updateNotification, disableNotification } = homeSlice.actions

export default homeSlice.reducer