const Category = require('../models/category.model');

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
            const categories = await Category.find({ is_deleted: false });
            return res.status(200).json({ status: true, data: categories })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findOne({ _id: id, is_deleted: false });
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
            const categories = await Category.find().populate('parent_id');
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
            const currentDate = new Date();
            const image_url = req.file ? '/images' + req.file.filename : undefined;
            const updatedData = { name, parent_id, image: image_url, date: currentDate }
            const updatedPost = await Category.findByIdAndUpdate(id, updatedData, { new: true })
            return res.status(200).json({ status: true, message: "Category updated successfully", data: updatedPost })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await Category.findOne({_id: id, is_deleted: false });
            if (!category) {
                return res.status(404).json({ status: false, message: "Category not found" })
            }
            console.log(category);
            const data = new Date().toString();
            const update = await Category.findByIdAndUpdate(
                { _id: id },
                {
                    is_deleted: true,
                    deleted_at: data
                }
            );
            return res.status(200).json({ status: true, message: "Category deleted successfully", data: update })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    }
}

module.exports = categoryController;