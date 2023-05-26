import { get } from "lodash"
import { CUSTOM_ERRORS } from "./errors"
import { clearCookieSession } from "../../utils/auth"
import { renderErrorPage } from "../../controllers"
import { isXMLHttpRequest } from "../../utils/url"


export const generateHTTPClientError = (err, res, opts) => {
  const errorObj = new Error(err instanceof Error ? err?.message : err || res?.name)
  errorObj.message = res?.error_description || errorObj.message
  errorObj.messageKey = opts?.messageKey
  errorObj.stack = err instanceof Error ? err?.stack : null
  errorObj.statusCode = opts?.statusCode || res?.statusCode || 400
  return errorObj
}

const handleExpireError = (req, res, messageKey) => {
  if (messageKey === 'INVALID_TOKEN' || messageKey === 'SESSION_EXPIRED') {
    clearCookieSession(req, res)
  }
}

export const responseErrorJson = (req, res, error) => {
  const statusCode = get(error, 'statusCode', 400)
  const message = get(error, 'message', '')
  const messageKey = get(error, 'messageKey', CUSTOM_ERRORS.DEFAULT)

  handleExpireError(req, res, messageKey)
  return res.status(statusCode).json({ message, messageKey })
}

export const responseErrorPage = (req, res, error) => {
  const messageKey = get(error, 'messageKey', CUSTOM_ERRORS.DEFAULT)

  handleExpireError(req, res, messageKey)
  renderErrorPage(error, req, res)
}

export const responseError = (req, res, err) => {
  if (isXMLHttpRequest(req)) {
    return responseErrorJson(req, res, err)
  }
  return responseErrorPage(req, res, err)
}