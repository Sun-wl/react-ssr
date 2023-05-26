import camelscore from 'camelscore'
import { generateHTTPClientError } from "../lib/error/errorResponse"

/**
 * @param {number} statusCode 当前返回的 statusCode
 * @param {number|number[]} successStatusCode 设定的成功的code
 * @returns 
 */
const isSuccessStatusCode = (statusCode, successStatusCode) => {
  return statusCode && Array.isArray(successStatusCode)
    ? successStatusCode.includes(statusCode)
    : statusCode === successStatusCode
}

/**
 * responseSuccessChecker: 检验成功的 function
 * statusCode 为 成功时， 如果传入了 responseSuccessChecker，需要另外检验是否满足 responseSuccessChecker
 */
const isSuccessResponse = (response, successStatusCode, responseSuccessChecker) => {
  if (!response) return false
  const { statusCode } = response
  return responseSuccessChecker
    ? isSuccessStatusCode(statusCode, successStatusCode) && responseSuccessChecker(response)
    : isSuccessStatusCode(statusCode, successStatusCode)
}

/** 
 * @param {string} name name of the client request, used to log error
 * @param {*} req the client request object
 * @param {*} successCallback success callback with response body
 * @param {*} errorCallback error is created by generateError
 * @param {{resonseSuccessCode: number|number[], errorOpts: {}}} opts 
 * @returns 
 */
const clientRequestHandler =
  (name, req, successCallback, errorCallback, opts = {}) =>
    (err, response) => {
      const {
        responseSuccessCode = 200,
        responseSuccessChecker,
        errorOpts,
      } = opts
      if (err || !isSuccessResponse(response, responseSuccessCode, responseSuccessChecker)) {
        // 如果此时 statusCode 是 成功的 code 但是返回是错误的返回， 则将 statusCode 替换为 500
        const shouldReplaceStatusCode = isSuccessStatusCode(response?.statusCode, responseSuccessCode)
        const errorObject = generateHTTPClientError(
          err,
          {
            ...(response?.body || {}),
            statusCode: shouldReplaceStatusCode ? 500 : response?.statusCode
          },
          errorOpts
        )

        errorCallback(errorObject)
      } else {
        // 将下划线衔接的属性全部转换为驼峰式
        const result = camelscore.camelize(response.body)
        successCallback(result)
      }
    }

export default clientRequestHandler