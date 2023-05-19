import express from 'express'
import * as controller from '../controllers'
import { serverRenderInitialze } from '../middleware/serverRenderInitialze'

// eslint-disable-next-line new-cap
const router = express.Router()

router.get('*', serverRenderInitialze, controller.index)

export default router
