const User = require('../models/user.model')
const { generateOtp } = require('../utils/helper.functions')

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, phoneNo } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" })
            }
            const newUser = {
                userName: name,
                email,
                password,
                phoneNo
            }
            const addedData = await User.create(newUser)
            const otp = generateOtp()
            return res.status(201).json({ message: "User registered successfully", data: addedData, otp: otp })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    getUser: async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).json({ message: "User Fetched Successfully", data: users })
        } catch (error) {
            console.error("Error while fetching users:", error)
        }
    },
    getUserById: async (req, res) => {
        try {
            const id = req.params.id
            const user = await User.findById(id)
            return res.status(200).json({ message: "User by id fethced successfully", data: user })
        } catch (error) {
            console.error("Error while fetching user by id:", error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({ message: "Id is required" })
            }
            const userIndex = await User.findByIdAndDelete(id)
            return res.status(200).json({ message: "User Deleted successfuly" })
        } catch (error) {
            console.error("Error while deleting user:", error)
            return res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, email, password, phoneNo } = req.body
            console.log(name, email, password, phoneNo)
            if (!id) {
                return res.status(400).json({ message: "Id is required" })
            }
            const user = await User.findById(id)
            if (!user) {
                return res.status(404).json({ message: `User with id ${id}not found` })
            }
            const updatedUser = await User.findByIdAndUpdate(
                { _id: id },
                { userName: name, email, password, phoneNo },
                { new: true }
            )
            return res.status(200).json({ message: `User Updated Successfully ${updatedUser}`, })

        } catch (error) {
            console.error("Error while updating user:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}

module.exports = userController 