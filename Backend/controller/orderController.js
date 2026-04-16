import Order from "../model/order.js";
import Cart from '../model/cart.js'
import Product from '../model/product.js'

const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body

        // get cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty add item" })
        }
        // Prepare order items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }))
        // Calculate total amount
        const totalAmount = orderItems.reduce((total , item)=>total+(item.price * item.quantity),0)

        // Deduct stock from product

        // for (let item of cart.items) {
        //     await Product.findByIdAndUpdate(item.productId._id , {$inc : {stock:  -item.quantity}})
        // }
        // Create Order
         
        const newOrder = await Order.create({
            userId,
            items:orderItems,
            address,
            totalAmount,
            paymentMethod:"COD",
            status:"Placed"
        })

        // Clear cart
         
        await Cart.findOneAndUpdate({userId},{items:[]})
        res.status(201).json({message:"order placed successfully",newOrder , orderId:newOrder._id})
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export {placeOrder}