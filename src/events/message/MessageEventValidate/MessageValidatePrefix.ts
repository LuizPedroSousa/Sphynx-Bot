import { Server } from "@/entities/Server";
import { DiscordException } from "@/exceptions/DiscordException";
import { ServerRepository } from "@/repositories/ServerRepository";
import config from "config";
import { MessageEventValidatePrefixDTO } from "../MessageEventDTO";
export class MessageEventValidatePrefix {
  constructor(private serverRepository: ServerRepository) {}

  async execute({
    message,
    server,
  }: MessageEventValidatePrefixDTO): Promise<string> {
    let finalPrefix = config.get<string>("bot.prefix");

    const serverAlreadyExists =
      await this.serverRepository.findServerByIdDiscord(server.idDiscord);

    if (!serverAlreadyExists) {
      const newServer = new Server(server);
      await this.serverRepository.createServer(newServer);
    } else {
      finalPrefix = serverAlreadyExists.prefix;
    }

    if (!message.content.startsWith(finalPrefix)) {
      throw new DiscordException({});
    }

    return finalPrefix;
  }
}
