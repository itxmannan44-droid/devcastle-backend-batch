const User = require('../models/user.model')
const { generateOtp } = require('../utils/helper.functions')
const { hashPassword, comparePassword } = require('../utils/passwordHash.functions')
const jwt = require('jsonwebtoken')
const { userEnum } = require('../utils/types/enums.types')
const sendMail = require('../config/mailer.config')

const authController = {
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
            const otp = generateOtp()
            const newUser = {
                userName: name,
                email,
                password: hashedPassword,
                phoneNo,
                role,
                otp: otp,
                otpExpiredAt: new Date(Date.now() + 10 * 60 * 1000)
            }
            const mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: "Verify your email",
                text: `Your OTP for email verification is ${otp}. It will expire in 10 minutes.`
            }
            await sendMail(mailOptions)
            const addedData = await User.create(newUser)
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
            if (user.isVerified === false) {
                return res.status(401).json({ status: false, isEmilVerified: false, message: "Please verify your email" })
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
    verifyOtp: async (req, res) => {
        try {
            const { otp, email } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const currentDataTime = new Date(Date.now())
            console.log(user.otpExpiredAt, "User")
            console.log(currentDataTime, "Current")
            const otpValid = user.otp === otp && user.otpExpiredAt >= currentDataTime
            if (otpValid) {
                user.isVerified = true
                user.otp = null
                user.otpExpiredAt = null
                await user.save()
            } else {
                return res.status(400).json({ message: "Invalid or expired otp" })
            }
            return res.status(200).json({ status: true, message: "Email verified successfully" })
        } catch (error) {
            console.error("Error while verifying email:", error)
            return res.status(500).json({ message: "Internal Server error", error: error.message })
        }
    }
}
module.exports = authController