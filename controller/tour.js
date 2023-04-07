
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
    const { page } = req.query
    try {
        // const tours = await TourModal.find()
        // res.status(200).json(tours)

        const limit = 2;
        const startIndex = (Number(page) - 1) * limit
        const total = await TourModal.countDocuments({})
        const tours = await TourModal.find().limit(limit).skip(startIndex)

        res.status(200).json({
            data: tours,
            currentPage: Number(page),
            totalTours: total,
            numOfPages: Math.ceil(total / limit)
        })
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
            message: "Tour deleted"
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
    const { title, description, creator, tags, imageFile } = req.body
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
            _id: id
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

export const getTourBySearch = async (req, res) => {
    const { searchQuery } = req.query
    try {
        const title = new RegExp(searchQuery, "i")
        const tours = await TourModal.find({ title })
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}
export const getTourByTag = async (req, res) => {
    const { tag } = req.params
    try {
        const tours = await TourModal.find({ tags: { $in: tag } })
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}
export const getReletedTours = async (req, res) => {
    const tags = req.body
    try {
        const tours = await TourModal.find({ tags: { $in: tags } })
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({
            message: "something is wrong",
            error: error.message
        })
    }
}

export const likeTour = async (req, res) => {
    const { id } = req.params;
    try {
      if (!req.userId) {
        return res.json({ message: "User is not authenticated" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exist with id: ${id}` });
      }
  
      const tour = await TourModal.findById(id);
  
      const index = tour.likes.findIndex((id) => id === String(req.userId));
  
      if (index === -1) {
        tour.likes.push(req.userId);
      } else {
        tour.likes = tour.likes.filter((id) => id !== String(req.userId));
      }
  
      const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {
        new: true,
      });
  
      res.status(200).json(updatedTour);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };