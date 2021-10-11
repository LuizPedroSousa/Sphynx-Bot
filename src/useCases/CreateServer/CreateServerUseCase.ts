import { Server } from ".prisma/client";
import { Server as ServerEntity } from "@/entities/Server";
import { HttpException } from "@/exceptions/HttpException";
import { ServerRepository } from "@/repositories/ServerRepository";
import { CreateServerRequestDTO } from "./CreateServerDTO";

export class CreateServerUseCase {
  constructor(private serverRepository: ServerRepository) {}

  async execute(data: CreateServerRequestDTO): Promise<Server | null> {
    const serverAlreadyExists =
      await this.serverRepository.findServerByIdDiscord(data.server.idDiscord);

    if (serverAlreadyExists) {
      throw new HttpException({ message: "Server already exists" });
    }

    const server = new ServerEntity(data.server);
    await this.serverRepository.createServer(server);

    return server;
  }
}
