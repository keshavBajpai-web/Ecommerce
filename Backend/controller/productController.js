import Product from "../model/product.js";

// create user
const createUser = async (req, res) => {
  try {
    const user = await Product.create(req.body)
    res.status(200).json({ success: true, message: "data created successfully",user })
  } catch (error) {
    res.status(500).json({ success: false, message: "data not created", error })
  }
}

// get user
const getUser = async (req, res) => {
  try {
    const {search , category} = req.query
    let filter = {}
    if (search) {
      filter.title = {$regex :search , $options:"i"}
    }
    if (category) {
      filter.category = category
    }
    const products = await Product.find(filter)
    res.status(200).json({ success: true, message: "data found", products })
  } catch (error) {
    res.status(500).json({ success: false, message: "data not found", error })
  }
}
// update user

const updateUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json({ success: true, message: "data updated successfully", user })
  } catch (error) {
    res.status(500).json({ success: false, message: "not updated", error })
  }
}
// delete User
const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await Product.findByIdAndDelete(id)
    res.status(200).json({ success: true, message: "deleted successfully", user })
  } catch (error) {
    res.status(500).json({ success: false, message: "data not deleted", error })
  }
}


export {createUser , getUser ,updateUser ,deleteUser}