import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  deleteTodoById,
  getTodoById,
  updateTodoById,
  createRandomTodo,
} from "./methods.js";

import {
  getAllTodosFirestore,
  getTodoByIdFirestore,
  createTodoFirestore,
  deleteTodoByIdFirestore,
  updateTodoByIdFirestore,
} from "./firebase_methods.js";

const forwardRouter = Router();
forwardRouter.post("/todos", createTodo);
forwardRouter.get("/todos", getAllTodos);
forwardRouter.get("/todos/:id", getTodoById);
forwardRouter.put("/todos/:id", updateTodoById);
forwardRouter.delete("/todos/:id", deleteTodoById);
forwardRouter.post("/todos/random", createRandomTodo);

forwardRouter.get("/todosfirebase", getAllTodosFirestore);
forwardRouter.get("/todosfirebase/:id", getTodoByIdFirestore);
forwardRouter.post("/todosfirebase", createTodoFirestore);
forwardRouter.delete("/todosfirebase/:id", deleteTodoByIdFirestore);
forwardRouter.put("/todosfirebase/:id", updateTodoByIdFirestore);

export default forwardRouter;
