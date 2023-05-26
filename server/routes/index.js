import express from 'express'
import * as controller from '../controllers'
import { setDemoData } from '../controllers/demo'
import { serverRenderInitialze } from '../middleware/serverRenderInitialze'

// eslint-disable-next-line new-cap
const router = express.Router()

router.get('/demo', serverRenderInitialze, setDemoData, controller.index)

// 匹配除了 /api/ 开头以外的所有路由
router.get(/^(?!\/api\/).*/, serverRenderInitialze, controller.index)


export default router
