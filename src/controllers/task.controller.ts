import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { param } from 'express-validator';
import { statusEnum } from "../domain/enum/statusEnum";


const taskController = {
    create :  async (req : Request, res : Response) => { 
          try {
            const status = await prisma.status.findFirst({
                where: {
                  name: statusEnum.in_progress.toString(), 
                },
            });
            const task   = await  prisma.task.create({
                data : {
                    title : req.body.title,
                    description : req.body.description,
                    status: {
                        connect : {
                            id : status.id,
                        }
                    },
                    user : {
                        connect : {
                            id : req['userId']
                        }
                    }

                }
            })
            res.status(200).json({ message :  'task created sucessfully', task : task }); 
          } catch (error) {
            res.status(200).json({ message :  'Internal Error' });
          }
    },


    fetch :  async (req : Request, res : Response) => {  
        const page = parseInt(req.query.page as string) || 1; 
        const limit = parseInt(req.query.limit as string) || 5; 

        const skip = (page - 1) * limit;

        try {
            const tasks = await prisma.task.findMany({
                skip: skip,   
                take: limit,  
                orderBy: {
                    created_at: 'desc', 
                }
            });

            const totalTasks = await prisma.task.count();
            const totalPages = Math.ceil(totalTasks / limit);

            res.status(200).json({
                data: tasks,
                pagination: {
                    page: page,
                    totalPages: totalPages,
                    totalTasks: totalTasks,
                    limit: limit
                }
            });
            res.status(200).json({ message :  'message' }); 
        } catch {
            
        }
    },

    update :  async (req : Request, res : Response) => { 
        const taskId = parseInt(req.params.id);
         const task = await prisma.task.findFirst({
            where: {
                id: taskId
            }
        });

        if (!task) {
             res.status(404).json({ message: 'Task not found' }); 
        }

        const updateData: any = {
            title: req.body.title, 
            description: req.body.description, 
        };

        if (req.body.status_id) {
            updateData.status = {
                connect: { id: req.body.status_id } 
            };
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: updateData
        });
        res.status(200).json({ message :  'task updated sucessfully', task : updatedTask }); 
    },

    delete :  async (req : Request, res : Response) => {
        try {
            await prisma.task.delete({
                where : {
                    id  : parseInt(req.params.id)
                }
            })
            res.status(200).json({ message :  'task sucessfully deleted' });
        } catch (error) {
            res.status(200).json({ message :  'Internal Error' });
        }
     },
}

export default taskController