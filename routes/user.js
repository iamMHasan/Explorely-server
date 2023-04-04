import express from "express"
import { googleSignIn, signIn, signup } from "../controller/user.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/signin", signIn)
router.post("/googleSignIn", googleSignIn)

export default router;
