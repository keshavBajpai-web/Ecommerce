import { useState, useEffect } from "react";
import api from "../api/axios";
import React from 'react'
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem("userId")
  const [address, setAddress] = useState([])
  const [cart, setCart] = useState(null)
  const [selectAddress, setselectAddress] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (!userId) {
      navigate("/")
      return
    }
    api.get(`/cart/${userId}`).then((res) => setCart(res.data))
    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data.address)
      setselectAddress(res.data.address[0])
    })
  }, [])
  // console.log(address);


  if (!cart) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.productId.price, 0
  )
  const placeOrder = async () => {
    if (!selectAddress) {
      alert("please select an address")
      return
    }
    const res = await api.post('/order/place', {
      userId,
      address: selectAddress
    })
    navigate(`/order-success/${res.data.orderId}`)
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Address Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <h2 className="text-lg font-medium mb-3 text-gray-600">Select Address</h2>

          <div className="space-y-3">
            {address.map((addr) => (
              <label
                key={addr._id}
                className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition 
            ${selectAddress?._id === addr._id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-400"}`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={selectAddress?._id === addr._id}
                  onChange={() => setselectAddress(addr)}
                  className="mt-1 accent-green-500"
                />

                <div>
                  <strong className="block text-gray-800">
                    {addr.fullName}
                  </strong>
                  <p className="text-sm text-gray-500">
                    {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500">
                    📞 {addr.phone}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {cart.items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm text-gray-600">
                <span>{item.productId.title} × {item.quantity}</span>
                <span className="font-medium text-gray-800">
                  ₹{item.productId.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-green-600">₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-5 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition"
          >
            Place Order (COD)
          </button>
        </div>

      </div>
    </div>
  )
}

export default Checkout