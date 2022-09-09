"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTodo = exports.getTodoById = exports.updateTodoById = exports.deleteTodoById = exports.getAllTodos = exports.createTodo = void 0;
const uuid_1 = require("uuid");
const node_fetch_1 = __importDefault(require("node-fetch"));
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
    UUID_MISMATCH: { message: "UUID in path and body do not match" }
};
// Option 3 - Encapsulate the response entirely
function badRequest(res, message) {
    return res.status(400).json({ message });
}
async function createTodo(req, res) {
    const body = req.body;
    if (!("description" in body)) {
        return res.status(400).json({ message: "Input task required" });
    }
    const newTaskDescription = body.description;
    const newTodo = {
        id: (0, uuid_1.v4)(),
        description: newTaskDescription,
        done: false,
    };
    todoList[newTodo.id] = newTodo;
    return res.status(200).json(newTodo);
}
exports.createTodo = createTodo;
// Can mention unused request param
async function getAllTodos(_req, res) {
    return res.status(200).json(todoList);
}
exports.getAllTodos = getAllTodos;
async function deleteTodoById(req, res) {
    const { id } = req.params;
    if (id in todoList) {
        const entryToDelete = todoList[id];
        if (entryToDelete.description === 'Improve backend') {
            return res.status(405).json(messageJson('This todo cannot be deleted'));
        }
        else {
            delete todoList[id];
            return res.status(200).json();
        }
    }
    else {
        return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID);
    }
}
exports.deleteTodoById = deleteTodoById;
async function updateTodoById(req, res) {
    const { id } = req.params;
    const updatedTodo = req.body;
    if (updatedTodo.id !== id) {
        return res.status(409).json(messageJson("UUID in path and body do not match"));
    }
    else if (id in todoList) {
        todoList[id] = updatedTodo;
        return res.status(200).send();
    }
    else {
        return res.status(400).json(messageJson("UUID does not exist"));
    }
}
exports.updateTodoById = updateTodoById;
async function getTodoById(req, res) {
    const { id } = req.params;
    if (id in todoList) {
        return res.status(200).json(todoList[id]);
    }
    else {
        return badRequest(res, "UUID does not exist");
    }
}
exports.getTodoById = getTodoById;
async function createRandomTodo(_req, res) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), 3000);
    try {
        const responseJson = await (0, node_fetch_1.default)("http://www.boredapi.com/api/activity")
            .then(apiResponse => apiResponse.json());
        const randomActivity = responseJson["activity"];
        const randomTodo = {
            id: (0, uuid_1.v4)(),
            description: randomActivity,
            done: false,
        };
        todoList[randomTodo.id] = randomTodo;
        return res.status(200).json(randomTodo);
    }
    catch (e) {
        // AbortError not exported in node-fetch V2
        const errorMessage = messageJson("Request from external api timed out");
        return res.status(500).json(errorMessage);
    }
}
exports.createRandomTodo = createRandomTodo;
