import { Router } from 'express';
import { createTodo, getAllTodos, deleteTodoById } from './methods';
import { updateTodoById } from './newMethods';

const forwardRouter = Router();

forwardRouter.post('/todos', createTodo);
forwardRouter.get('/todos', getAllTodos);
forwardRouter.put('/todos/:id', updateTodoById);
forwardRouter.delete('/todos/:id', deleteTodoById);

export default forwardRouter;
