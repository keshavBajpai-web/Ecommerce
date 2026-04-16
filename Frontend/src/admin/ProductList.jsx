import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { NavLink } from 'react-router'
const ProductList = () => {
    const [value, setValue] = useState([])

    const getData = async () => {
        try {
            const res = await api.get('/product')
            setValue(res.data.products)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteProduct = async (id) => {
        try {
           const res = await api.delete(`/product/delete/${id}`)
            alert(res.data.message)
            getData()
        } catch (error) {
            alert(error.response.data.message)
        }

    }


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <div className='flex justify-between px-4'>
                    <h2 className="text-2xl font-bold mb-5 text-gray-700">
                        Product List
                    </h2>
                    <h2 className='text-2xl font-bold mb-5 text-gray-700'>
                        <NavLink to={`/AddProduct`}>Add Products</NavLink>
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

                        {/* Header */}
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Price</th>
                                <th className="py-3 px-4 text-left">Stock</th>
                                <th className="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {value.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-2 hover:bg-gray-100 transition"
                                >
                                    <td className="py-3 px-4 border">{item.title}</td>
                                    <td className="py-3 px-4 border">₹{item.price}</td>
                                    <td className="py-3 px-4 border">{item.stock}</td>

                                    <td className="py-3 px-4 space-x-2 text-center border">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                                            <NavLink to={`/EditProduct/${item._id}`}
                                            >Edit</NavLink>
                                        </button>

                                        <button onClick={() => deleteProduct(item._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    )
}

export default ProductList