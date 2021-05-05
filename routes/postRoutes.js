
const express = require("express")
const postController = require("../controllers/postController")

const router = express.Router()

// localhost:8000
router
    .route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost)

router
    .route("/:id")
    .get(postController.getOnePostById)
    .patch(postController.updatePost)
    .delete(postController.deletePost)


module.exports = router;