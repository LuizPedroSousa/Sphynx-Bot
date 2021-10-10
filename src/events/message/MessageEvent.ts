import { DiscordException } from "@/exceptions/DiscordException";
import { HttpException } from "@/exceptions/HttpException";
import { DiscordEventData, IDiscordEvent } from "@/interfaces/IDiscordEvent";
import { Message } from "discord.js";
import { MessageEventInfo } from "./MessageEventInfo";
import { MessageEventValidate } from "./MessageEventValidate";

export class MessageEvent implements IDiscordEvent {
  constructor(
    private messageEventInfo: MessageEventInfo,
    private messageEventValidate: MessageEventValidate
  ) {}
  info() {
    return this.messageEventInfo.execute();
  }

  async execute({
    message,
    commands,
    client,
  }: DiscordEventData): Promise<void> {
    try {
      if (!message) {
        throw new HttpException({ message: "message has not provided" });
      }

      if (message?.author === client.user) {
        return;
      }

      const { command, prefix, args } = await this.messageEventValidate.execute(
        {
          server: {
            idDiscord: message.guild?.id as string,
            name: message.guild?.name as string,
          },
          client,
          commands,
          message,
        }
      );

      await command.execute({ message, prefix, args });
    } catch (err) {
      if (err instanceof DiscordException) {
        if (err.message) {
          message?.channel.send({
            content: err?.message,
          });
        }
      }
    }
  }
}
