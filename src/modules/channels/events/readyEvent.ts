import { DiscordEvent } from "@/entities/DiscordEvent";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import { DiscordEventData, IDiscordEvent } from "@/shared/core/IDiscordEvent";
import { injectable } from "tsyringe";
import logger from "@/shared/utils/logger";
import c from "config";

@injectable()
export class ReadyEvent implements IDiscordEvent {
  constructor() {}

  info(): DiscordEvent {
    return new DiscordEvent({ name: "ready", once: true });
  }

  execute({ client, message }: DiscordEventData): void {
    if (!client?.user) {
      throw new DiscordException({ message: "Discord user unavailable" });
    }

    setInterval(() => {
      const botStatus = [
        "Socorro",
        "quem inventou JS?",
        "HMM café docin ☕",
        "AAAAAAAAAAAAAA",
      ];

      client?.user?.setActivity(
        botStatus[Math.floor(botStatus.length * Math.random())],
        {
          type: "STREAMING",
        }
      );
    }, 10000);

    logger.success(
      `Logado como: ${client.user.tag}, para ${client.guilds.cache.size} servidores`
    );
  }
}
