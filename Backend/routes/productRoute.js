import express from 'express'
import { createUser ,getUser ,updateUser ,deleteUser } from '../controller/productController.js'
const router = express.Router()

router.get('/',getUser)
router.post('/add',createUser)
router.put('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)

export default router