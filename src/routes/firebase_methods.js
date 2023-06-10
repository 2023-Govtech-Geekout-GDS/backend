import { db } from "../config/admin.js";

const ERROR_MSGS = {
  NO_SUCH_UUID: { message: "UUID does not exist" },
  TASK_REQUIRED: { message: "Input task required" },
  UUID_MISMATCH: { message: "UUID in path and body do not match" },
};

/*
Assume Firestore format:
Collection: todos
Documents: id
Fields: {description:string, done:boolean}
*/

// Get all todo entries
export async function getAllTodosFirestore(req, res) {
  const toDoRef = db.collection("todos");

  toDoRef.get().then(function (data) {
    const todoList = {};
    data.forEach((doc) => {
      todoList[doc.id] = {
        id: doc.id,
        description: doc.data().description,
        done: doc.data().done,
      };
    });
    return res.status(200).json(todoList);
  })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
}

// Get todo entry based on todo id
export async function getTodoByIdFirestore(req, res) {
  const { id } = req.params;
  const document = db.collection("todos").doc(id);

  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID);
    }
    return res.status(200).json({
      id: doc.id,
      description: doc.data().description,
      done: doc.data().done,
    });
  })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

// Post new todo entry
export async function createTodoFirestore(req, res) {
  const body = req.body;
  if (!("description" in body)) {
    return res.status(400).json(ERROR_MSGS.TASK_REQUIRED);
  }
  const newTaskDescription = body.description;
  const newTodo = {
    description: newTaskDescription,
    done: false,
  };

  db.collection("todos").add(newTodo).then((doc) => {
    const responseTodoItem = {
      id: doc.id,
      description: newTodo.description,
      done: newTodo.done,
    };
    return res.json(responseTodoItem);
  })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
}

// Delete todo entry based on todo id
export async function deleteTodoByIdFirestore(req, res) {
  const { id } = req.params;
  const document = db.collection("todos").doc(id);

  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID);
    }
    document.delete();
  })
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

// Update todo entry based on todo id
export async function updateTodoByIdFirestore(req, res) {
  const { id } = req.params;
  const updatedTodo = req.body;
  const document = db.collection("todos").doc(id);

  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID);
    }
    document.update(updatedTodo);
  })
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code,
      });
    });
}
