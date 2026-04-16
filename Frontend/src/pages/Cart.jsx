import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'
const Cart = () => {
  const userId = localStorage.getItem("userId")
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()

  // load cart 
  const loadCart = async () => {
    if (userId) {
      const res = await api.get(`/cart/${userId}`)
      setCart(res.data)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

// console.log(cart);

  const removeItem = async (productId) => {
    await api.post(`/cart/remove`, { userId, productId });
    loadCart()
    window.dispatchEvent(new Event("cartUpdated"))

  }
  // update Item quantity

  const updateQty = async (productId, quantity) => {
    if (quantity === 0) {
      await removeItem(productId)
      return;
    }
    await api.post('/cart/update', { userId, productId, quantity });
    loadCart()
    window.dispatchEvent(new Event("cartUpdated"))
  }

  if (!cart) {
    return <div>Loading...</div>
  }


  const total = cart?.items?.reduce((sum, item) => sum + item.productId.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cart?.items?.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
            >
              {/* Image + Info */}
              <div className="flex items-center gap-4 w-1/2">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-semibold text-lg">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-500">
                    ₹{item.productId.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span className="font-medium">{item.quantity}</span>

                <button
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div className="font-semibold text-lg">
                ₹{(item.productId.price * item.quantity).toFixed(2)}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">
              Total: ₹{total.toFixed(2)}
            </h2>

            <button
              onClick={() => navigate("/checkaddress")}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
