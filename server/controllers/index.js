// import { executeServerRenderInitialze } from '../middleware/serverRenderInitialze'
import { updateCustomServerData, getServerRenderData } from '../utils/ssr'

function index(req, res) {
  const data = getServerRenderData(res)
  // eslint-disable-next-line no-console
  // console.log('rendering index with:', data)
  res.render('index', data)
}

function renderErrorPage(err, req, res) {
  // executeServerRenderInitialze(req, res, () => {
  updateCustomServerData(res, { error: err })
  const data = getServerRenderData(res)
  res.render('index', data)
  // })
}

export { index, renderErrorPage }
