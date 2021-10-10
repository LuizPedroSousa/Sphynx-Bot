import { MessageEmbed } from "discord.js/typings/index.js";

interface DiscordExceptionProps {
  message?: string;
  embed?: MessageEmbed;
}

export class DiscordException extends Error {
  public embed?: MessageEmbed;
  public message: string;
  constructor({ message, embed }: DiscordExceptionProps) {
    super(message);

    if (message) {
      this.message = message;
    }

    if (embed) {
      this.embed = embed;
    }
  }
}
