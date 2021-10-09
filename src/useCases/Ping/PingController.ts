import { Request, Response } from "express";
import { PingView } from "@/useCases/Ping/PingView";

export class PingController {
  constructor(private pingView: PingView) {}

  handle(req: Request, res: Response) {
    const response = this.pingView.render();
    return res.status(200).json(response);
  }
}

