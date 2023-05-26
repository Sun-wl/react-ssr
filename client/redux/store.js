import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import homeReducer from './slices/homeSlice'
import demoReducer from './slices/demoSlice'
import createAppInitialState from './initialStates/appInitialState'
import createHomeInitialState from './initialStates/homeInitialState'
import createDemoInitialState from './initialStates/demoInitialState'

const getStore = (serverData) =>
  configureStore({
    reducer: {
      app: appReducer,
      home: homeReducer,
      demo: demoReducer,
    },
    preloadedState: {
      app: createAppInitialState(serverData),
      home: createHomeInitialState(serverData),
      demo: createDemoInitialState(serverData)
    },
  })

export default getStore
