import express from "express"
import verifyToken from "../middleware/auth.js"
import {getFeedPosts, deletePost, getUserPosts, likePost, unlikePost} from "../controllers/posts.js"

const router = express.Router()

router.get("/", verifyToken, getFeedPosts)
router.get("/:userId", verifyToken, getUserPosts)
router.delete("/:id", verifyToken, deletePost)
router.patch("/:id/like", verifyToken, likePost)
router.patch("/:id/unlike", verifyToken, unlikePost)

export default router