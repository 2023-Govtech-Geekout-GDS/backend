import { Request, Response } from "express";

export async function sayHello(req: Request, res: Response) {
    res.send("Hello World");
}