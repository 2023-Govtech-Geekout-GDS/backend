import { Router } from "express";
import {
    sayHello
} from "./methods";

const forwardRouter = Router();
forwardRouter.get("/hello", sayHello);

export default forwardRouter;