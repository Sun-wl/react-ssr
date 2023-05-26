import { Request } from "../utils/request"
import { API_PATH } from "../utils/endpoints"

export const getDemoList = async () => {
  return Request.get(`${API_PATH}/demoList`)
}

export const addDemo = async (data) => {
  return Request.post(`${API_PATH}/demo/add`).send(data)
}
// export const deleteDemo = async (data) => {
//   return Request.post(`${API_PATH}/demo/delete`)
//     .timeout({
//       response: 35 * 1000, // Wait 35 seconds for the server to start sending,
//       deadline: 2 * 60 * 1000, // but allow 2 minute for the file to finish loading.
//     })
//     .send(data)
// }