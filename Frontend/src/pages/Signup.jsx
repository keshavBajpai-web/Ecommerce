import React from 'react'
// import { useEffect } from 'react'
import { useState } from 'react'
import api from '../api/axios'
import { NavLink } from 'react-router'
const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/auth/add', data)
            console.log(res.data);
            alert(res.data.message)
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message)

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
        <div className='min-h-screen flex justify-center items-center bg-yellow-50'>
            <div className="bg-white p-8 shadow-lg w-full max-w-sm rounded-2xl">

                <h2 className='text-center mb-6 text-2xl font-bold'>Create account </h2>
                <form className='flex flex-col gap-4 mb-2'
                    onSubmit={handleSubmit}
                    action="">
                    <input className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        name='name'
                        onChange={handleChange}
                        placeholder='Enter Name'
                        type="text"
                    />
                    <input className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        name='email'
                        onChange={handleChange}
                        placeholder='Enter Email'
                        type="text"
                    />
                    <input className='border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        name='password'
                        onChange={handleChange}
                        placeholder='Enter Password'
                        type="text"
                    />
                    <button type='submit'
                        className='bg-blue-400 text-white rounded-2xl p-1 hover:bg-blue-600'
                    >
                        Signup
                    </button>
                </form>
                <NavLink className={"ml-4"} to={'/login'}>Login</NavLink>
            </div>
        </div>
    )
}

export default Signup
