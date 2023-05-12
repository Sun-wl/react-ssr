import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import homeReducer from './slices/homeSlice'
import createAppInitialState from './initialStates/appInitialState'
import createHomeInitialState from './initialStates/homeInitialState'

const getStore = (serverData) => (configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
  },
  preloadedState: {
    app: createAppInitialState(serverData),
    home: createHomeInitialState(serverData)
  }
}))

export default getStore