import express from 'express'
import { saveAdress , getAddress } from '../controller/addressController.js'
const router  = express.Router()
router.post('/add',saveAdress)
router.get('/:userId',getAddress)
export default router