import {  PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import {  body, check, validationResult } from "express-validator";
import { prisma } from "../utils/prisma";


export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
  body('name')
        .notEmpty()
        .withMessage('Name is required'),

        
  async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(422).json({ errors: errors.array() });
      }
      //email verification
      const { email } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        res.status(422).json({ message: 'Email already in use' });
      }

      next();
    }
];



export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
        .isLength({ min: 6 })
        .withMessage('Password is required'),
        
  async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(422).json({ errors: errors.array() });
      }
      next();
    }
];
