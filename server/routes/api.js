import express from 'express'
import * as demo from '../controllers/demo'

// eslint-disable-next-line new-cap
const router = express.Router()

router.post('/demo/add', demo.addDemo)


export default router
