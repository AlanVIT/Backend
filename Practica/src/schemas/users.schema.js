import mongoose from 'mongoose'

export const userCollection = 'Users'
const userSchema = new mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    sport:{
        require:true,
        type:String
    },
    age:{
        type:Number
    },
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel