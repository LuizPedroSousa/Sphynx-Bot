import { DiscordEvent } from "@/entities/DiscordEvent";
import { IDiscordEvent, DiscordEventData } from "@/shared/core/IDiscordEvent";
import { CreateServerRequestDTO } from "@/modules/server/dtos/CreateServerDTO";
import logger from "@/shared/utils/logger";
import { CreateServerService } from "@/modules/server/services/CreateServerService";
import { container, inject, injectable } from "tsyringe";
import { IServerRepository } from "@/modules/server/repositories/IServerRepository";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import { AddCreateUsersQueue } from "@/modules/user/services/AddCreateUsersQueue";
import { Server } from "@/modules/server/infra/typeorm/entities/Server";
import { CreateUsersService } from "@/modules/user/services/CreateUsersService";

@injectable()
export class GuildCreateEvent implements IDiscordEvent {
  info(): DiscordEvent {
    return new DiscordEvent({ name: "guildCreate" });
  }

  async execute({ id, name, client, guild }: DiscordEventData): Promise<void> {
    const createUsersService = container.resolve(CreateUsersService);
    const serverRepository =
      container.resolve<IServerRepository>("ServerRepository");

    try {
      let server = await serverRepository.findServerByIdDiscord(id);

      if (!server) {
        server = await serverRepository.createServer(
          new Server({ idDiscord: id, name: name })
        );
      }

      console.log(guild);
      const users = guild.members.cache.map((user) => {
        return {
          name: user.nickname,
          idDiscord: user.id,
          avatar_url: user.displayAvatarURL(),
          discriminator: user.,
          servers: [server],
        };
      });

      await createUsersService.execute({ users });

      logger.success(
        `Guild ${server?.name} with id ${server?.idDiscord} has ben created`
      );
    } catch (error) {
      if (error instanceof DiscordException) {
        logger.error(
          `Failed on create ${name} guild with id ${id}.`,
          error?.message
        );
        return;
      }
      logger.error("Internal bot error", error);
    }
  }
}
