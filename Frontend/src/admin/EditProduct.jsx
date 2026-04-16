import { useState, useEffect } from "react"
import api from "../api/axios"
import { useNavigate, useParams } from "react-router"
const EditProduct = () => {
    const [data, setData] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        image: ""
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const getData = async () => {
        try {
            const res = await api.get('/product')
            const product = res.data.products.find((p) => p._id === id)
            setData(product)

        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        getData()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.put(`/product/update/${id}`, data)
            setData(res.data)
            alert(res.data.message)
            navigate('/product')
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = async (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    // console.log(data);


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold text-gray-700 mb-5 text-center">
                    Edit Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter title"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter description"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter price"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="stock"
                        value={data.stock}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter stock"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter category"
                    />

                    <input
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter image URL"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
                    >
                        Edit Product
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditProduct
