import { NextFunction, Request, Response } from "express";
import {  body, check, validationResult } from "express-validator";

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

        
  (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    }
];

