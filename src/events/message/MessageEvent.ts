import { HttpException } from "@/exceptions/HttpException";
import { DiscordEventData, IDiscordEvent } from "@/interfaces/IDiscordEvent";
import { Message } from "discord.js";
import { MessageEventInfo } from "./MessageEventInfo";

export class MessageEvent implements IDiscordEvent {
  constructor(private messageEventInfo: MessageEventInfo) {}
  info() {
    return this.messageEventInfo.execute();
  }
  execute({ message }: DiscordEventData): void {
    if (!message) {
      throw new HttpException({ message: "message has not provided" });
    }
    message.reply({ content: "asd" });
  }
}
