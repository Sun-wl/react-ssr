import { responseError } from '../lib/error/errorResponse'
import * as demoModel from '../models/demo'
import { updateCustomServerData } from '../utils/ssr'
import logger from '../lib/logger'

export const setDemoData = async (req, res, next) => {
  try {
    // 获取 url 中的参数
    // const id = req.params.id
    const demoList = await demoModel.getDemoList(req)
    updateCustomServerData(res, {
      demoList,
    })
    return next()
  } catch (err) {
    logger.error(req, 'set demo data error', err)
    return responseError(req, res, err)
  }
}

export const addDemo = async (req, res) => {
  try {
    const payload = req.body
    const { isSuccess } = await demoModel.addDemo(payload)
    return res.status(200).json({
      isSuccess
    })
  } catch (err) {
    logger.error(req, 'add demo error', err)
    return responseError(req, res, err)
  }
}