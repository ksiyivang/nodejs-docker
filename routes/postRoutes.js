
const express = require("express")
const postController = require("../controllers/postController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

// localhost:8000
router
    .route("/")
    .get(protect.postController.getAllPosts)
    .post(protect.postController.createPost)

router
    .route("/:id")
    .get(protect.postController.getOnePostById)
    .patch(protect.postController.updatePost)
    .delete(protect.postController.deletePost)


module.exports = router;