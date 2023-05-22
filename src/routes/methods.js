import { v4 } from "uuid";
import fetch from "node-fetch";

// This is not exported, which means only methods exposed in this file will access it.
const todoList = {};

// Option 1 - wrapper for arbitrary messages
function messageJson(message) {
  return { message };
}

// Option 2 - enumerate the messages
const ERROR_MSGS = {
  NO_SUCH_UUID: { message: "UUID does not exist" },
  TASK_REQUIRED: { message: "Input task required" },
  UUID_MISMATCH: { message: "UUID in path and body do not match" },
};

// Option 3 - Encapsulate the response entirely
function badRequest(res, message) {
  return res.status(400).json({ message });
}

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
    return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID);
  }

  if (entryToDelete.description === "Improve backend") {
    return res.status(405).json(messageJson("This todo cannot be deleted"));
  }

  delete todoList[id];
  return res.status(200).json();
}

export async function updateTodoById(req, res) {
  const { id } = req.params;
  const updatedTodo = req.body;
  if (id in todoList) {
    todoList[id] = { ...todoList[id], ...updatedTodo };
    return res.status(200).send();
  } else {
    return res.status(400).json(messageJson("UUID does not exist"));
  }
}

export async function getTodoById(req, res) {
  const { id } = req.params;
  if (id in todoList) {
    return res.status(200).json(todoList[id]);
  } else {
    return badRequest(res, "UUID does not exist");
  }
}

export async function createRandomTodo(_req, res) {
  try {
    const responseJson = await fetch(
      "http://www.boredapi.com/api/activity"
    ).then((apiResponse) => apiResponse.json());
    const randomActivity = responseJson["activity"];
    const randomTodo = {
      id: v4(),
      description: randomActivity,
      done: false,
    };
    todoList[randomTodo.id] = randomTodo;
    return res.status(200).json(randomTodo);
  } catch (e) {
    // AbortError not exported in node-fetch V2
    const errorMessage = messageJson("Request from external api timed out");
    return res.status(500).json(errorMessage);
  }
}
