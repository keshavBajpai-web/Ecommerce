import React from 'react'
import { useParams } from 'react-router'

const OrderSuccess = () => {
    const { id } = useParams()

    const goHome = () => {
        window.location.href = "/"
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

                {/* Success Icon */}
                <div className="text-green-500 text-5xl mb-4">✅</div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Order Placed Successfully
                </h1>

                {/* Order ID */}
                <p className="text-gray-600 mb-4">
                    Your Order ID:
                    <span className="block font-semibold text-gray-800 mt-1">
                        {id}
                    </span>
                </p>

                {/* Button */}
                <button
                    onClick={goHome}
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    )
}

export default OrderSuccess