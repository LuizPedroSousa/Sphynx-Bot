import { DiscordEvent } from "@/entities/DiscordEvent";
import { IDiscordEvent, DiscordEventData } from "@/interfaces/IDiscordEvent";
import { CreateServerUseCase } from "@/useCases/CreateServer/CreateServerUseCase";
import { CreateServerRequestDTO } from "@/useCases/CreateServer/CreateServerDTO";
import { GuildCreateEventInfo } from "./GuildCreateEventInfo";
import logger from "@/utils/logger";

export class GuildCreateEvent implements IDiscordEvent {
  private guildCreateEventInfo: GuildCreateEventInfo;
  constructor(private createServerUseCase: CreateServerUseCase) {
    this.guildCreateEventInfo = new GuildCreateEventInfo();
  }

  info(): DiscordEvent {
    return this.guildCreateEventInfo.execute();
  }

  async execute({ id, name }: DiscordEventData): Promise<void> {
    const data: CreateServerRequestDTO = {
      server: {
        idDiscord: id as string,
        name: name as string,
      },
    };

    try {
      const server = await this.createServerUseCase.execute(data);

      logger.success(
        `Guild ${server?.name} with id ${server?.idDiscord} has ben created`
      );
    } catch (err) {
      logger.error(`Failed on create ${name} guild with id ${id}.`);
    }
  }
}
