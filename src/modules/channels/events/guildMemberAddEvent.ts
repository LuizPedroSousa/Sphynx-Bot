import { DiscordEvent } from "@/entities/DiscordEvent";
import { IServerRepository } from "@/modules/server/repositories/IServerRepository";
import { CreateUserService } from "@/modules/user/services/CreateUserService";
import { DiscordEventData, IDiscordEvent } from "@/shared/core/IDiscordEvent";
import { User } from "discord.js";
import { container, injectable } from "tsyringe";

@injectable()
export class GuildMemberAddEvent implements IDiscordEvent {
  public info(): DiscordEvent {
    return new DiscordEvent({ name: "guildMemberAdd" });
  }

  async execute({ user, guild }: DiscordEventData<{ user: User }>) {
    const createUserService = container.resolve(CreateUserService);

    const serverRepository =
      container.resolve<IServerRepository>("ServerRepository");

    const server = await serverRepository.findServerByIdDiscord(guild.id);

    await createUserService.execute({
      avatar_url: user.displayAvatarURL(),
      discriminator: user.discriminator,
      idDiscord: user.id,
      name: user.username,
      server,
    });
  }
}
