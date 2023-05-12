import express from 'express'
import * as controller from '../controllers'
import { serverRenderInitialze } from '../middleware/serverRenderInitialze'

const router = express.Router();

router.get('/home', serverRenderInitialze, controller.index)

export default router