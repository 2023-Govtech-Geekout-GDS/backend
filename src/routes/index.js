import { Router } from "express";
import {
    createTodo,
    getAllTodos,
    deleteTodoById,
    getTodoById,
    updateTodoById
} from "./methods.js";

const forwardRouter = Router();
forwardRouter.post("/todos", createTodo);
forwardRouter.get("/todos", getAllTodos);
forwardRouter.get("/todos/:id", getTodoById);
forwardRouter.put("/todos/:id", updateTodoById);
forwardRouter.delete("/todos/:id", deleteTodoById);

export default forwardRouter;
