import { DiscordEvent } from "@/entities/DiscordEvent";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";
import { DiscordEventData, IDiscordEvent } from "@/shared/core/IDiscordEvent";
import logger from "@/shared/utils/logger";
import { User } from "discord.js";
import { container, injectable } from "tsyringe";

@injectable()
export class GuildMemberRemoveEvent implements IDiscordEvent {
  public info() {
    return new DiscordEvent({ name: "guildMemberRemove" });
  }

  async execute({ user, ...rest }: DiscordEventData<{ user: User }>) {
    try {
      const userRepository =
        container.resolve<IUserRepository>("UserRepository");

      const userExists = await userRepository.findOne({
        idDiscord: user.id,
      });

      if (!userExists) {
        logger.info(`User ${user.id} not found`);
        return;
      }

      await userRepository.delete(userExists);

      logger.success(`User ${user.username} has been deleted`);
    } catch (error) {}
  }
}
