const User = require('../models/user.model')
const { generateOtp } = require('../utils/helper.functions')
const { hashPassword, comparePassword } = require('../utils/passwordHash.functions')
const jwt = require('jsonwebtoken')
const { userEnum } = require('../utils/types/enums.types')

const userController = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password, phoneNo, role } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" })
            }
            if (role === userEnum.admin || role === userEnum.user || role === userEnum.vendor) true
            else {
                return res.status(400).json({ message: "Invalid role" })
            }
            const emailExist = await User.findOne({ email })
            const adminExist = await User.findOne({ role: userEnum.admin })
            if (role === userEnum.admin && adminExist) {
                return res.status(400).json({ message: "Admin already exists" })
            }
            if (emailExist) {
                return res.status(400).json({ message: "Email already exists" })
            }
            const hashedPassword = await hashPassword(password)
            const newUser = {
                userName: name,
                email,
                password: hashedPassword,
                phoneNo,
                role
            }
            const addedData = await User.create(newUser)
            const otp = generateOtp()
            return res.status(201).json({ message: "User registered successfully", data: addedData, otp: otp })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(400).json({ message: "Missing email or password" })
            }
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const isPasswordMatched = await comparePassword(password, user.password)
            if (!isPasswordMatched) {
                return res.status(401).json({ message: "Invalid credentials" })
            }
            const userData = {
                id: user._id,
                name: user.userName,
                email: user.email,
                role: user.role
            }
            const token = await jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

            return res.status(200).json({ message: "Login Successful", data: userData, accessToken: token })
        } catch (error) {
            console.error("Error while logging in:", error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.user.id
            const parsedId = id.toString()
            const users = await User.findOne({ _id: parsedId })
            return res.status(200).json({ message: "User Fetched Successfully", data: users })
        } catch (error) {
            console.error("Error while fetching users:", error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).json({ message: "User Fetched Successfully", data: users })
        } catch (error) {
            console.error("Error while fetching users:", error)
            return res.status(500).json({ message: "Internal server error" })
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