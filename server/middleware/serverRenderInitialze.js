import { getCachedUserInfo } from '../models/cache'
import { updateCustomServerData } from '../utils/ssr'
import { setupClientAssets } from './setupClientAssets'

const setupLocals = async (req, res, next) => {
  await getCachedUserInfo(req)
  updateCustomServerData(res, {
    locale: 'zh-CN',
    userInfo: req?.session?.user
  })
  next()
}

export const executeServerRenderInitialze = (req, res, next) => {
  const init = () =>
    setupLocals(req, res, async () => {
      await setupClientAssets(req, res, next)
    })

  if (!req.locale) {
    // TODO
    init()
  } else {
    init()
  }
}

export const serverRenderInitialze = [setupLocals, setupClientAssets]
