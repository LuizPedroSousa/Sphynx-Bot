import postgresServerRepository from "@/repositories/implementations/PostgresServerRepository";
import { CreateServerUseCase } from "./CreateServerUseCase";

const createServerUseCase = new CreateServerUseCase(postgresServerRepository);

export { createServerUseCase };
