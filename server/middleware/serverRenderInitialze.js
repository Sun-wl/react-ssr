import { updateCustomServerData } from '../utils/ssr'
import { setupClientAssets } from './setupClientAssets'

function setupLocals(req, res, next) {
  updateCustomServerData(res, {
    locale: 'zh-CN',
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
