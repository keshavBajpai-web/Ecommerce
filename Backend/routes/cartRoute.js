import express from 'express'
import { addItemToCart , removeItems ,updateQuantity ,getCart } from '../controller/cartController.js'
const router = express.Router()

// Add item to cart 
router.post('/add',addItemToCart)

// remove item
router.post('/remove',removeItems)

// Update item quantity in the cart
router.post('/update',updateQuantity)

// get cart
router.get('/:userId',getCart)

export default router