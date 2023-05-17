import { executeServerRenderInitialze } from '../middleware/serverRenderInitialze'
import { updateCustomServerData, getServerRenderData } from '../utils/ssr'

function index(req, res) {
  const data = getServerRenderData(res)
  //debug log (logs to std out when DEBUG environment variable is set)
  console.log('rendering index with:', data)
  res.render('index', data)
}

function renderErrorPage(err, req, res) {
  executeServerRenderInitialze(req, res, () => {
    updateCustomServerData(res, { error: err })
    const data = getServerRenderData(res)
    res.render('index', data)
  })
}

export { index, renderErrorPage }
