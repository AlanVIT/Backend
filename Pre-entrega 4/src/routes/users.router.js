import { Router } from "express";
import  {UsersController}  from "../controllers/users.controller.js";

const router = Router();

router.get('/',UsersController.getAllUsers);

router.delete('/',UsersController.deleteUsers);



export default router;