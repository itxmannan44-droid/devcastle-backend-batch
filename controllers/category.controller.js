const Category = require('../models/category.model');
const { deleteImages } = require('../utils/helper.functions');

const categoryController = {
    createCategory: async (req, res) => {
        try {
            const { name, parent_id } = req.body;
            if (!name || !req.file) {
                return res.status(400).json({ message: "Both image and name required" })
            }
            const imageUrl = '/images/' + req.file.filename;
            const newCategory = new Category({ name, parent_id, image: imageUrl });
            await newCategory.save();
            res.status(201).json({ status: true, message: "Category created successfully", post: newCategory })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            let search = req.query.search || ""

            let filter = { is_deleted: false };

            if (search) {
                filter.name = { $regex: search, $options: 'i' }
            }

            const skip = (page - 1) * limit
            const categories = await Category.find(
                { is_deleted: false }, filter,
            ).skip(skip).limit(limit).sort({ _id: -1 });
            const pagination = {
                currentPage: page,
                perPage: limit,
                currentShowing: categories.length,
                totalItems: await Category.countDocuments({ is_deleted: false }),
                totalPages: Math.ceil(await Category.countDocuments({ is_deleted: false }) / limit)
            }
            return res.status(200).json({ status: true, data: categories, pagination })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findOne({ _id: id, is_deleted: false }).populate('parent_id');
            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" })
            }
            return res.status(200).json({ status: true, data: category })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    getParentChildCategories: async (req, res) => {
        try {
            const categories = await Category.find({ is_deleted: false }).populate('parent_id');
            return res.status(200).json({ status: true, data: categories });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, parent_id } = req.body
            const category = await Category.findOne({ _id: id, is_deleted: false });

            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" })
            }

            let imageUrl;

            if (req.file) {
                deleteImages(category.image);
                imageUrl = '/images/' + req.file.filename;
            }
            const updatedPost = await Category.findByIdAndUpdate({ _id: id }, { name, parent_id, image: imageUrl }, { new: true })
            return res.status(200).json({ status: true, message: "Category updated successfully", data: updatedPost })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const parent_id = req.params.id;
            const category = await Category.findOne({ _id: parent_id, is_deleted: false });
            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" })
            }
            const currentDate = new Date().toString();
            const update = await Category.updateMany(
                {
                    $or: [
                        { _id: parent_id },
                        { parent_id: parent_id }
                    ]
                },
                { is_deleted: true, date: currentDate }
            )

            return res.status(200).json({ status: true, message: "Category deleted successfully", data: update })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    }
}

module.exports = categoryController;