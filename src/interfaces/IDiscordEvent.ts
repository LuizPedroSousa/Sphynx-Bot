import { DiscordEvent } from "@/entities/DiscordEvent";
import { Client, Guild, Message } from "discord.js";
import { ICommand } from "./ICommand";

export interface DiscordEventData {
  client: Client;
  message?: Message;
  guild?: Guild;
  commands: ICommand[];
  id?: string; // guildCreate
  name?: string; // guildCreate
}

export interface IDiscordEvent {
  info(): DiscordEvent;
  execute(props: DiscordEventData): Promise<void> | void;
}
