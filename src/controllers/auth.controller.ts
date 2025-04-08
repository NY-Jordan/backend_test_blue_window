import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { prisma } from "../utils/prisma";
import bcrypt from 'bcrypt';
import { createUserToken } from "../services/user.service";



const authController = { 
    
    register : async (req : Request, res : Response) => {
        const { email, name, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user =  await prisma.user.create( {
           data : {
            name : name,
            email : email,
            passowrd : hashedPassword
           }
         })
         const token  = createUserToken(user);
         res.status(200).json({ user : user, token : token  });
    },

    login : async (req : Request, res : Response) => {

        const { email, password } = req.body;
        try {
            const user = await prisma.user.findFirst({
                where: { email },
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.passowrd);

            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid credentials" });
            }
            const token = createUserToken(user); 
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
  },
}

export default authController