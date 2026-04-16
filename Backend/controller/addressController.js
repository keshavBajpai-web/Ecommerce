import Address from "../model/address.js";


const saveAdress = async (req, res) => {
    try {
        const address = await Address.create(req.body)
        res.json({ message: "Address saved successfully", address })
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

// Get address by userId

const getAddress = async (req, res) => {
    try {
        const address = await Address.find({userId:req.params.userId})
        res.status(200).json({message:"Address found",address})
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
}

export {saveAdress , getAddress}
