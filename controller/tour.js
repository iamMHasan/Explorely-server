
import mongoose from "mongoose";
import TourModal from "../models/tour.js"

export const createTour = async (req, res) => {
    const tour = req.body
    const newTour = new TourModal({
        ...tour,
        creator: req.userId,
        createdAt: new Date().toISOString()
    })

    try {
        await newTour.save()
        res.status(200).json(newTour)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
};

export const getTours = async (req, res) => {
    try {
        const tours = await TourModal.find()
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}
export const getTour = async (req, res) => {
    const { id } = req.params
    try {
        const tour = await TourModal.findById(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}

export const getTourByUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "user not exsit" })
    }
    const userTours = await TourModal.find({ creator: id })
    res.status(200).json(userTours)
}
export const deleteTour = async (req, res) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "user not exist" })
        }
        await TourModal.findByIdAndDelete(id)
        res.status(200).json({
            message : "Tour deleted"
        })
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}


export const updateTour = async (req, res) => {
    const { id } = req.params
    const {title, description, creator, tags, imageFile} = req.body
    try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "user not exsit" })
    }

    const updatedTour = {
        title,
        creator,
        description,
        tags,
        imageFile,
        _id : id
    }
        await TourModal.findByIdAndUpdate(id, updatedTour)
        res.status(200).json(updatedTour)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}

export const getTourBySearch = async(req, res)=>{
    const {searchQuery} = req.query 
    try {
        const title = new RegExp(searchQuery, "i")
        const tours = await TourModal.find({title})
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}
export const getTourByTag = async(req, res)=>{
    const {tag} = req.params
    try {
        const tours =await TourModal.find({tags : {$in : tag}})
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}