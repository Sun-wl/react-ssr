import { createSlice } from '@reduxjs/toolkit'
import createInitialState from '../initialStates/demoInitialState'

export const demoSlice = createSlice({
  name: 'demo',
  initialState: createInitialState(),
  reducers: {

  },
})

export const { } = demoSlice.actions

export default demoSlice.reducer
