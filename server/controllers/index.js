import { executeServerRenderInitialze } from '../middleware/serverRenderInitialze'
import { updateCustomServerData, getServerRenderData } from '../utils/ssr'
import path from 'path'

function index(req, res) {
  const data = getServerRenderData(res)
  //debug log (logs to std out when DEBUG environment variable is set)
  console.log('rendering index with:', data)
  res.render('index', data.locals)
}

function renderErrorPage(err, req, res) {
  executeServerRenderInitialze(req, res, () => {
    updateCustomServerData(res, { error: err })
    const data = getServerRenderData(res)
    res.render('index', data.locals)
  })
}

export { index, renderErrorPage }
