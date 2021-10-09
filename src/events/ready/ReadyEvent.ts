import { DiscordEvent } from "@/entities/DiscordEvent";
import { DiscordEventData, IDiscordEvent } from "@/interfaces/IDiscordEvent";
import { Client } from "discord.js/typings/index.js";
import Logger from "@utils/logger";
import { ReadyEventInfo } from "./ReadyEventInfo";
import { HttpException } from "@/exceptions/HttpException";

export class ReadyEvent implements IDiscordEvent {
  constructor(
    private readyEventInfo: ReadyEventInfo,
    private logger: typeof Logger
  ) {}

  info(): DiscordEvent {
    const readyEventInfo = this.readyEventInfo.execute();
    return readyEventInfo;
  }

  execute({ client }: DiscordEventData): void {
    if (!client?.user) {
      throw new HttpException({ message: "Discord user unavailable" });
    }

    this.logger.success(
      `Logado como: ${client.user.tag}, para ${client.guilds.cache.size} servidores`
    );
  }
}
