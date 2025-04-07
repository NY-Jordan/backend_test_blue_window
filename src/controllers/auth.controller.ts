import { Request, Response } from "express";
import { validationResult } from "express-validator";



const authController = { 
    register : async (req : Request, res : Response) => {

       res.status(200).json({ data: req.body });
    },

    login : async (req : Request, res : Response) => {
        res.status(200).json({ message: "login success!" });
    }
}

export default authController