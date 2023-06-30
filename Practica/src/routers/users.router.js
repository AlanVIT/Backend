import { Router } from "express";
import userManager from "../managers/user.manager";

const router = Router()

const userM = new userManager()

router.get('/', async(req, res)=>{
    const users = await userM.getAllUsers()
    res.json({message:"get", users})
})
router.get('/:id', async(req, res)=>{
    const id = req.params
    res.json({message:"get"})
})
router.put('/', async(req, res)=>{
    res.json({message:"get"})
})
router.post('/', async(req, res)=>{
    res.json({message:"get"})
})
router.delete('/', async(req, res)=>{
    res.json({message:"get"})
})

export default router