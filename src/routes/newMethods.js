import { todoList } from "./methods.js";

export async function updateTodoById(req, res) {
  const { id } = req.params;
  const updatedTodo = req.body;
  if (id in todoList) {
    todoList[id] = { ...todoList[id], ...updatedTodo };
    return res.status(200).send();
  } else {
    return res.status(400).json({ message: "UUID does not exist" });
  }
}

export async function getTodoById(req, res) {
  const { id } = req.params;
  if (id in todoList) {
    return res.status(200).json(todoList[id]);
  } else {
    return res.status(400).json({ message: "UUID does not exist" });
  }
}
