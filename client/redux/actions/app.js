import { updateStatus } from '../slices/appSlice'

export const disableUser = () => (dispatch) => {
  dispatch(updateStatus('disabled'))
}

export const enableUser = () => (dispatch) => {
  dispatch(updateStatus('enabled'))
}
