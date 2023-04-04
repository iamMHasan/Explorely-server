import jwt from "jsonwebtoken"
import UserModal from "../models/user.js"
const secret = "test"

const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1]
        const isCustomauth = token?.length < 500
        let decodedData;
        if (token && isCustomauth) {
            decodedData = jwt.verify(token, secret)
            console.log(decodedData)
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token)
            const googleId = decodedData?.sub.toString()
            const user = await UserModal.findOne({ googleId })
            req.userId = user?._id
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;