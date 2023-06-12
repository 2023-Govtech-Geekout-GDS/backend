import { v4 } from "uuid";
import fetch from "node-fetch";

// This is not exported, which means only methods exposed in this file will access it.
export const todoList = {};

export async function createTodo(req, res) {
  const body = req.body;
  if (!("description" in body)) {
    return res.status(400).json({ message: "Input task required" });
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
  const entryToDelete = todoList[id];

  if (!entryToDelete) {
    return res.status(400).json({ message: "UUID does not exist" });
  }

  if (entryToDelete.description === "Improve backend") {
    return res.status(405).json(messageJson("This todo cannot be deleted"));
  }

  delete todoList[id];
  return res.status(200).json();
}
