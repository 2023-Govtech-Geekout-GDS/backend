import { Router } from "express";
import {
    createTodo,
    getAllTodos,
    deleteTodoById,
    getTodoById,
    updateTodoById,
    createRandomTodo
} from "./methods";

const forwardRouter = Router();
forwardRouter.post("/todos", createTodo);
forwardRouter.get("/todos", getAllTodos);
forwardRouter.get("/todos/:id", getTodoById);
forwardRouter.put("/todos/:id", updateTodoById);
forwardRouter.delete("/todos/:id", deleteTodoById);
forwardRouter.post("/todos/random", createRandomTodo);

export default forwardRouter;
