import { Router } from "express";
import { PingRouter } from "./PingRoute";

const router = Router();

const routes = [new PingRouter(router)];

export { routes };
