import { DiscordEvent } from "@/entities/DiscordEvent";
import { Client, Message } from "discord.js/typings/index.js";

export interface DiscordEventData {
  client: Client;
  message?: Message;
}

export interface IDiscordEvent {
  info(): DiscordEvent;
  execute(props: DiscordEventData): Promise<void> | void;
}
