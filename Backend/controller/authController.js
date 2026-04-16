import User from '../model/authSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all field require" })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(500).json({ success: false, message: "user already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword
        })
        res.status(200).json({ success: true, message: "Signup successfully", user })
    } catch (error) {
        res.status(400).json({ success: false, message: "Signup failed", error })
    }
}

const getSignup = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json({ success: true, message: "data found", user })
    } catch (error) {
        res.status(500).json({ success: false, message: "data not found", error })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all field required" })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ success: false, message: "user not found" })
        }
        const isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "wrong password" })
        }
        const token = jwt.sign(
            { id: userExist._id },
            process.env.SECRET_KEY,
            { expiresIn: '5d' }
        )
        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            user: {
                userId: userExist._id,
                name: userExist.name,
                email: userExist.email
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export { Signup, getSignup ,Login}
