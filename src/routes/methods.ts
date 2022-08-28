import { Request, Response } from "express";

export async function sayHello(req: Request, res: Response) {
    res.status(200).json({ title: "Hello World" });
}