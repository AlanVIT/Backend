import mongoose from "mongoose";
import { students } from "./data.js";
import studentModel from "./students.model.js";
const MONGO = `mongodb+srv://AlanVT:<password>@alanvt.egiux6n.mongodb.net/?retryWrites=true&w=majority`


const main = async () =>{
    await mongoose.connect(MONGO)
}

const insertStudents = async ()=>{
    await studentModel.insertMany(students)
}

main()
insertStudents()

const res1 = await studentModel.aggregate([{$sort:{grade:-1}}])
console.log(res1)

const res2 = await studentModel.aggregate([{$group:{_id:"group", count: {$count: {}}}}])
console.log(res2);

const res3 = await studentModel.aggregate([
    {$match:{$group:"1B"}},
    {$group:{_id:{}, avg:{$avg:"grade"}}}
])
console.log(res3);

const res4 = await studentModel.aggregate([
    {$match:{$group:"1A"}},
    {$group:{_id:{}, avg:{$avg:"grade"}}}
])
console.log(res4);

const res5 = await studentModel.aggregate([
    {$group:{_id:{}, avg:{$avg:"grade"}}}
])
console.log(res5);

const res6 = await studentModel.aggregate([
    {$match:{$gender:"Male"}},
    {$group:{_id:{}, avg:{$avg:"grade"}}}
])
console.log(res6);
