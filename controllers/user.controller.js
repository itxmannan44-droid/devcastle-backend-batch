const { generateOtp } = require('../utils/helper.functions')

let userTable = [
    { id: 1, name: "Mannan", email: "jhon@example.com", password: "12345" },
]
const userController = {
    registerUser: (req, res) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" })
            }
            const newUSer = {
                id: userTable.length + 1,
                name,
                email,
                password
            }
            const addedData = userTable.push(newUSer)
            const otp = generateOtp()
            return res.status(201).json({ message: "User registered successfully", data: addedData, otp: otp })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    getUser: (req, res) => {
        try {
            const users = userTable
            return res.status(200).json({ message: "User Fetched Successfully", data: users })
        } catch (error) {
            console.error("Error while fetching users:", error)
        }
    },
    getUserById: (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const user = userTable.find(u => u.id === id)
            console.log(id, user)
            return res.status(200).json({ message: "User by id fethced successfully", data: user })
        } catch (error) {
            console.error("Error while fetching user by id:", error)
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    deleteUser: (req, res) => {
        try {
            const id = parseInt(req.params.id)
            if (!id) {
                return res.status(400).json({ message: "Id is required" })
            }
            const userIndex = userTable.findIndex(u => u.id === id)
            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" })
            }
            userTable.splice(userIndex, 1)
            return res.status(200).json({ message: "User Deleted successfuly" })
        } catch (error) {
            console.error("Error while deleting user:", error)
            return res.status(500).json({ message: "Internal Server Error", error: error.message })
        }
    },
    updateUser: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { email, name, password } = req.body
            const user = userTable.find(u => u.id === id)
            if (!user) {
                return res.status(404).json({ message: `User with id ${id}not found` })
            }
            user.email = email || "abc@gmail.com",
                user.password = password || "12345678"
            user.name = name || "ABC"

            return res.status(200).json({ message: `User with id${id} previous data was ${user} updated to ${email}, ${name}, ${password}`, })

        } catch (error) {
            console.error("Error while updating user:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}

module.exports = userController 