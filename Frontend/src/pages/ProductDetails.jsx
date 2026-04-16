import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../api/axios'

const ProductDetails = () => {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  const loadData = async () => {
    const res = await api.get(`/product`)
    const data = res.data.products.find((item) => item._id === id)
    setProduct(data)
  }

  useEffect(() => {
    loadData()
  }, [])



if (!loadData) {
  return <div>Loading...</div>
}

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      {
        product && (
          <div className="bg-white shadow-lg rounded-2xl max-w-4xl w-full grid md:grid-cols-2 gap-6 p-6">

            {/* Image */}
            <div className="flex justify-center items-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-[350px] object-contain rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h2>

                <p className="text-xl text-green-600 font-semibold mb-4">
                  ₹{product.price}
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Button */}
              <button 
               className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition duration-300">
                Add to Cart
              </button>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default ProductDetails