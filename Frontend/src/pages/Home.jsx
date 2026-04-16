import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Link } from 'react-router'
const Home = () => {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const loadProducts = async () => {
    const res = await api.get(`/product?search=${search}&category=${category}`)
    setProduct(res.data.products)
  }
  // console.log(product);

  useEffect(() => {
    loadProducts()
  }, [search, category])

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      alert("please login to add item in your cart")
      return
    }
    const res = await api.post(`/cart/add`, { userId, productId });

    const total = res.data.cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0)
    console.log(total);
    
    localStorage.setItem("cartCount", total)
    window.dispatchEvent(new Event("cartUpdate"))
    alert("added to cart")
  }

  return (
    <>
      <div className="p-7">

        {/* Search + Filter */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-4 bg-white shadow-md rounded-2xl p-4 w-full max-w-xl">

            <input
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="🔍 Search products..."
            />

            <select
              value={category}
              className="border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="mobile">📱 Mobile</option>
              <option value="Laptops">💻 Laptop</option>
              <option value="Tablet">📲 Tablet</option>
            </select>

          </div>
        </div>

        {/* Product Grid */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {product.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
    >
      {/* Link only for product click */}
      <Link to={`/productDetails/${item._id}`}>
        
        {/* Image */}
        <div className="h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {item.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description}
          </p>
        </div>

      </Link>

      {/* Button OUTSIDE Link */}
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(item._id)}
          className="w-full bg-blue-500 hover:bg-blue-700 font-bold text-white rounded-2xl py-2 mt-2 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </>
  )
}

export default Home
