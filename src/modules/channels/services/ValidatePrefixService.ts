import { botConfig } from "@/config/botConfig";
import { Server } from "@/modules/server/infra/typeorm/entities/Server";
import { IServerRepository } from "@/modules/server/repositories/IServerRepository";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import { inject, injectable } from "tsyringe";
import { ValidateMessagePrefixDTO } from "../dtos/ValidateMessagePrefix.dto";

@injectable()
export class ValidatePrefixService {
  constructor(
    @inject("ServerRepository")
    private serverRepository: IServerRepository
  ) {}

  async execute({ message, user }: ValidateMessagePrefixDTO): Promise<string> {
    let finalPrefix = botConfig.prefix;

    await this.serverRepository.findServerByIdDiscord(message.author.id);

    const serverAlreadyExists =
      await this.serverRepository.findServerByIdDiscord(
        message?.guildId || message.id
      );

    if (!serverAlreadyExists) {
      const newServer = new Server({
        idDiscord: message?.guild?.id || "",
        name: message?.guild?.name || "",
        users: [user],
      });

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
