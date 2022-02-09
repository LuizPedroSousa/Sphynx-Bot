import { container } from "tsyringe";
import { ServerRepository } from "../infra/typeorm/repositories/ServerRepository";
import { IServerRepository } from "../repositories/IServerRepository";

container.registerSingleton<IServerRepository>(
  "ServerRepository",
  ServerRepository
);
