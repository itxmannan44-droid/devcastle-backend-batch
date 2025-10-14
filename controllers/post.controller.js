// const PostSchema = require('../models/post.model');
// const User = require('../models/user.model');

// const postController = {
//     createPost: async (req, res) => {
//         try {
//             const { title, content, user } = req.body;
//             if (!title || !content || !user) {
//                 return res.status(400).json({ message: "All fields are required" })
//             }
//             const userExist = await User.findById(user);
//             if (!userExist) {
//                 return res.status(404).json({ status: false, message: "User not found" })
//             }
//             const newPost = new PostSchema({ title, content, user });
//             await newPost.save();
//             res.status(201).json({ status: true, message: "Post created successfully", post: newPost })
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//         }
//     },
//     getAllPosts: async (req, res) => {
//         try {
//             const posts = await PostSchema.find().populate("user")
//             return res.status(200).json({ status: true, data: posts })
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//         }
//     },
//     getPostById: async (req, res) => {
//         try {
//             const id = req.params.id;
//             const post = await PostSchema.findById(id);
//             if (!post) {
//                 return res.status(404).json({ status: false, message: "Post not found" })
//             }
//             return res.status(200).jsin({ status: true, data: post })
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//         }
//     },
//     updatePost: async (req, res) => {
//         try {
//             const id = req.params.id;
//             const { title, content } = req.body
//             const currentDate = new Date();
//             const updatedData = { title, content, date: currentDate }
//             const updatedPost = await PostSchema.findByIdAndUpdate(id, updatedData, { new: true })
//             return res.status(200).json({ status: true, message: "Post updated successfully", data: updatedPost })
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//         }
//     },
//     deletePost: async (req, res) => {
//         try {
//             const id = req.params.id;
//             const deletedData = await PostSchema.findByIdAndDelete(id);
//             return res.status(200).json({ status: true, message: "Post deleted successfully", data: deletedData })
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
//         }
//     }
// }

// module.exports = postController;