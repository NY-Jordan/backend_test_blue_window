import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { prisma } from "../utils/prisma";

export const createTaskValidator = [
    body('title')
      .isString()
      .isLength({ min : 5 })
      .withMessage('title must have at least 6 characters ')
      .notEmpty()
      .withMessage('title is required'),


    body('description')
        .isLength({ min: 6 })
        .withMessage('description must have at least 12 characters ')
        .notEmpty()
        .withMessage('description is required'),
          
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateTaskValidator = [
    body('title')
      .isString()
      .isLength({ min : 5 })
      .withMessage('title must have at least 6 characters ')
      .notEmpty()
      .withMessage('title is required'),

    
    body('description')
        .isLength({ min: 6 })
        .withMessage('description must have at least 12 characters ')
        .notEmpty()
        .withMessage('description is required'),
          
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           res.status(422).json({ errors: errors.array() });
        }
        //check if status exist 
        if (req.body.status_id) {
            const status = await prisma.status.findUnique({
                where : { 
                    id : parseInt(req.body.status_id)
                }
            })
            if (!status) {
                res.status(404).json({ message: 'Status not found' });
            }
        }
        
        //check if task exist
        const task = await prisma.task.findUnique({
            where : { 
                id : parseInt(req.params.id)
            }
        })
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        next();
    }
];

export const deleteTaskValidator = [

    param('id')
        .notEmpty()
        .withMessage('task id missed'),
          
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           res.status(422).json({ errors: errors.array() });
        }
        
        const task = await prisma.task.findUnique({
            where : { 
                id : parseInt(req.params.id)
            }
        })
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        next();
    }
];
  