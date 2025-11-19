const User = require('../models/user.model')

const userController = {
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
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const search = req.query.search || ""

            let filter = {};

            if (search) {
                filter.$or = [
                    { userName: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }

            const offset = (page - 1) * limit
            const users = await User.find(filter).skip(offset).limit(limit).sort({ createdAt: -1 })
            return res.status(200).json({
                message: "User Fetched Successfully",
                data: users,
                pagination: {
                    offset: offset,
                    limit: limit,
                    total: await User.countDocuments()
                }
            })
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
