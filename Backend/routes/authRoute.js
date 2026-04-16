import express from 'express'
import { getSignup, Login, Signup } from '../controller/authController.js'
const router = express.Router()
router.get('/',getSignup)
router.post('/add',Signup)
router.post('/login',Login)

export default router
