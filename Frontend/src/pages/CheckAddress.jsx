import React, { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const CheckAddress = () => {
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const saveAddress = async (e) => {
        e.preventDefault()
        try {
            const userId = localStorage.getItem("userId")
            await api.post('/address/add', {
                ...form,
                userId,
            })
            navigate('/checkout')
        } catch (error) {
            // alert(error.response.data.message)
            console.log(error.message);

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={saveAddress}
                className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">
                    Delivery Address
                </h1>

                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key]}
                        placeholder={key}
                        type="text"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                    />
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
                >
                    Save Address
                </button>
            </form>
        </div>
    )
}

export default CheckAddress