import { v4 } from "uuid";

export const todoList = {};

export async function createTodo(req, res) {
  const body = req.body;
  if (!("description" in body)) {
    return res.status(400).json({ message: "Input task required"});
  }
  const newTaskDescription = body.description;
  const newTodo = {
    id: v4(),
    description: newTaskDescription,
    done: false,
  };
  todoList[newTodo.id] = newTodo;
  return res.status(200).json(newTodo);
}

// Can mention unused request param
export async function getAllTodos(_req, res) {
  return res.status(200).json(todoList);
}

export async function deleteTodoById(req, res) {
  const { id } = req.params;
  if (id in todoList) {
      delete todoList[id];
      return res.status(200).send();
  } else {
      return res.status(400).json({ message: "UUID does not exist" });
  }
}
