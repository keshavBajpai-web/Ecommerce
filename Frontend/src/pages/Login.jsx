import { useState } from "react"
import api from "../api/axios"
import { NavLink, useNavigate } from 'react-router'
const Login = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post('/auth/login', value)
            setValue(res.data)
            alert(res.data.message)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("userId",res.data.user.userId)
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)

        }

    }
console.log(value);

    const handleChange = async (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    // console.log(value);

    return (
        <div className='min-h-screen flex justify-center items-center bg-yellow-50'>
            <div className="bg-white p-8 shadow-lg w-full max-w-sm rounded-2xl">

                <h2 className='text-center mb-6 text-2xl font-bold'> Login </h2>
                <form className='flex flex-col gap-4 mb-2'
                    onSubmit={handleSubmit}
                    action="">

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
                        Login
                    </button>
                </form>
                <NavLink className={"ml-3"} to={'/signup'}>
                    Signup
                </NavLink>
            </div>
        </div>
    )
}

export default Login
