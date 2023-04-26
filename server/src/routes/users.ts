import express from "express"
import {getUser, getUserFriends, deleteUser, addFriend, removeFriend} from "../controllers/users.js"
import verifyToken from "../middleware/auth.js"

const router = express.Router()

router.get("/:id", verifyToken, getUser)
router.get("/:id/friends", verifyToken, getUserFriends)
router.delete("/:id", verifyToken, deleteUser)
router.patch("/:id/:friendId/addFriend", verifyToken, addFriend)
router.patch("/:id/:friendId/removeFriend", verifyToken, removeFriend)

export default router