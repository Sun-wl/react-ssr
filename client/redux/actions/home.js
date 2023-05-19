import {
  updateNotification,
  disableNotification as disableNoti,
} from '../slices/homeSlice'

export const enableNotification = () => (dispatch) => {
  dispatch(updateNotification(true))
}

export const disableNotification = () => (dispatch) => {
  dispatch(disableNoti())
}

export const changeNotification = () => (dispatch, getState) => {
  const state = getState()
  dispatch(updateNotification(!state?.home?.showNotification))
}
