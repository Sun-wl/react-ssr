
import { updateCustomServerData } from '../utils/ssr'

function setupLocals(req, res, next) {
  updateCustomServerData(res, {
    locale: 'zh-CN',
  })
  next()
}

export const executeServerRenderInitialze = (req, res, next) => {
  const init = () => setupLocals(req, res, () => { })

  if (!req.locale) {

  } else {
    init()
  }
}

export const serverRenderInitialze = [
  setupLocals,
]
