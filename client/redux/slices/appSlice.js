import { createSlice } from '@reduxjs/toolkit'
import createInitialState from '../initialStates/appInitialState'

export const appSlice = createSlice({
  name: 'app',
  initialState: createInitialState(),
  reducers: {
    updateStatus: (state, action) => {
      return {
        ...state,
        status: action.payload,
      }
    },
  },
})

export const { updateStatus } = appSlice.actions

export default appSlice.reducer
