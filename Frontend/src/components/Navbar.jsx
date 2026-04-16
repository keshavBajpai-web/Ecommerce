import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";
import React from 'react'

const Navbar = () => {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0)
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const loadCart = async () => {
            try {
                if (!userId) return setCartCount(0)

                const res = await api.get(`/cart/${userId}`)
                const items = res.data.cart?.items || []

                const total = items.reduce((sum, item) => sum + item.quantity, 0)
                setCartCount(total)
            } catch (err) {
                console.log(err)
            }
        }

        loadCart()

        const handler = () => loadCart()
        window.addEventListener("cartUpdate", handler)

        return () => {
            window.removeEventListener("cartUpdate", handler)
        }
    }, [userId])

    const logout = () => {
        localStorage.clear()
        setCartCount(0)
        navigate('/login')
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
                Keshav Store
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-6">

                {/* Cart */}
                <Link to="/cart" className="relative text-lg hover:text-blue-400 transition">
                    🛒 Cart
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {/* Auth */}
                {!userId ? (
                    <>
                        <Link to="/login" className="hover:text-blue-400 transition">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition">
                            Signup
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar