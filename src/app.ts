import "express-async-errors";
import express, { Application } from "express";
import helmet from "helmet";
import logger from "./utils/logger";
import { checkErrors } from "./middlewares/errors";
import { routes } from "./routes";
import { DiscordClient } from "./services/DiscordClient";
import createDatabaseConnection from "./database/connection";
export class App {
  public app: Application;
  public port: string | number;
  public env: string;
  public address: string;
  public databaseConnection: Promise<void>;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3333;
    this.address = process.env.ADDRESS || "http://localhost";
    this.env = process.env.NODE_ENV || "development";
    this.databaseConnection = createDatabaseConnection.connect();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeServices();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`----- ENV: ${this.env} -----`);
      logger.success(`-🚀 Server Started in ${this.address}:${this.port}`);
    });
  }

  private initializeServices() {
    new DiscordClient();
  }

  private initializeMiddlewares() {
    this.app.use(helmet());
  }

  private initializeRoutes() {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(checkErrors);
  }
}
