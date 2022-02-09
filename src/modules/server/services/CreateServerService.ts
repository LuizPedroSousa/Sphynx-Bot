import { DiscordException } from "@/shared/exceptions/DiscordException";
import { inject, injectable } from "tsyringe";
import { CreateServerRequestDTO } from "../dtos/CreateServerDTO";
import { Server } from "../infra/typeorm/entities/Server";
import { IServerRepository } from "../repositories/IServerRepository";

@injectable()
export class CreateServerService {
  constructor(
    @inject("ServerRepository")
    private serverRepository: IServerRepository
  ) {}

  async execute(data: CreateServerRequestDTO): Promise<Server | null> {
    const serverAlreadyExists =
      await this.serverRepository.findServerByIdDiscord(data.server.idDiscord);

    if (serverAlreadyExists) {
      throw new DiscordException({ message: "Server already exists" });
    }

    const server = new Server(data.server);

    await this.serverRepository.createServer(server);

    return server;
  }
}
