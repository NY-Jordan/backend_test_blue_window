import { Router } from "express";
import taskController from "../controllers/task.controller";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { createTaskValidator, deleteTaskValidator, updateTaskValidator } from "../validators/taskValidator";

const taskRoutes = Router();

//aplly auth middleware
taskRoutes.use(authenticateJWT);

taskRoutes.get('/', taskController.fetch);
taskRoutes.post('/create', createTaskValidator, taskController.create);
taskRoutes.put('/update/:id', updateTaskValidator, taskController.update);
taskRoutes.delete('/delete/:id', deleteTaskValidator, taskController.delete);


export default taskRoutes;