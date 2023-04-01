import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

import Usermodal from "../models/user.js"

const secret = "test"

export const signup = async(req, res)=>{
    const {email, password, firstName, lastName} = req.body 

    try {
        const oldUser = await Usermodal.findOne({email})

        if(oldUser){
            return res.status(400).json({
                message : "you already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await Usermodal.create({
            email,
            password : hashedPassword,
            name : `${email} ${password}`
        });

        const token = Jwt.sign({email : result.email , id : result._id}, secret, {expiresIn : "1h"})

        res.status(201).json({
            result,
            token
        })
    } catch (error) {
        res.status(500).json({
            message : 'SOMETHING IS WRONG',
            error : error.message
        })
    }

}