import { DiscordEvent } from "@/entities/DiscordEvent";
import { Client, Message } from "discord.js/typings/index.js";
import { ICommand } from "./ICommand";

export interface DiscordEventData {
  client: Client;
  message?: Message;
  commands: ICommand[];
}

export interface IDiscordEvent {
  info(): DiscordEvent;
  execute(props: DiscordEventData): Promise<void> | void;
}
