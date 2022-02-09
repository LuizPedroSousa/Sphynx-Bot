import { container } from "tsyringe";
import { UserRepository } from "../infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
