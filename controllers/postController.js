
const Post = require("../models/postModel");


// get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "failed"
        })
    }
}

// get post by id

exports.getOnePostById = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        });

    } catch (error) {
        res.status(400).json({
            status: "failed"
        })
    }
}

// create a Post

exports.createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "success",
            data: { post }
        });
    } catch (error) {
        res.status(400).json({
            status: "failed"
        })
    }
}

// update a Post
exports.updatePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed"
        })
    }
}

// update a delete
exports.deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed"
        })
    }
}