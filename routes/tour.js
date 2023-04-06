import express from "express"
import auth from "../middleware/auth.js"
import { createTour, deleteTour, getTour, getTourBySearch, getTourByTag, getTourByUser, getTours, updateTour } from "../controller/tour.js"

const router = express.Router()

router.post("/", auth, createTour)
router.get("/", getTours)
router.get("/search", getTourBySearch)
router.get("/tag/:tag", getTourByTag)
router.get("/:id", getTour)

router.delete("/:id", auth, deleteTour)
router.patch("/:id", auth, updateTour)
router.get("/userTours/:id", auth, getTourByUser)

export default router;