// import { request } from "../lib/request"
// import clientRequestHandler from "../utils/clientRequestHandler"
// import { API_Host, endpoints } from "../utils/constants"


export const getDemoList = (req) => {
  return [
    { name: 'aaa', value: 'aaa' },
    { name: 'bbb', value: 'bbb' }
  ]
  // return new Promise((resolve, reject) => {
  //   request(req, {
  //     method: 'get',
  //     url: `${API_Host}${endpoints.getDemos}`
  //   })
  //   .set('token', '')
  //   .send()
  //   .end(
  //     clientRequestHandler('GET DEMO', req, resolve, reject, {
  //       responseSuccessCode: [200, 201]
  //     })
  //   )
  // })
}

export const addDemo = (data) => {
  return {
    isSuccess: true,
    data,
  }
}