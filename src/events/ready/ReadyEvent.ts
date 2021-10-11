import { DiscordEvent } from "@/entities/DiscordEvent";
import { DiscordEventData, IDiscordEvent } from "@/interfaces/IDiscordEvent";
import Logger from "@utils/logger";
import { ReadyEventInfo } from "./ReadyEventInfo";
import { HttpException } from "@/exceptions/HttpException";

export class ReadyEvent implements IDiscordEvent {
  private readyEventInfo: ReadyEventInfo;
  constructor(private logger: typeof Logger) {
    this.readyEventInfo = new ReadyEventInfo();
  }

  info(): DiscordEvent {
    const readyEventInfo = this.readyEventInfo.execute();
    return readyEventInfo;
  }

  execute({ client }: DiscordEventData): void {
    if (!client?.user) {
      throw new HttpException({ message: "Discord user unavailable" });
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

    this.logger.success(
      `Logado como: ${client.user.tag}, para ${client.guilds.cache.size} servidores`
    );
  }
}
