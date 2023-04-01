import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     name : {
//         type : String,
//         required : true 
//     },
//     email : {
//         type : String,
//         required : true 
//     },
//     password : {
//         type : Number,
//     },
//     googleId : {
//         type : String,
//     },
//     id : {
//         type : String,
//     },
// })
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    id: { type: String },
  });
export default mongoose.model("user", userSchema )