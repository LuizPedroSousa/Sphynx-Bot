import { Routes } from "@/interfaces/Routes";
import { pingController } from "@/useCases/Ping";
import { Router } from "express";

export class PingRouter implements Routes {
  public path: string;
  public router: Router;

  constructor(router: Router) {
    this.path = "/";
    this.router = router;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}ping`, (req, res) =>
      pingController.handle(req, res)
    );
  }
}
