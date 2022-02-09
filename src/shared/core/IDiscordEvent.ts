import { DiscordEvent } from "@/entities/DiscordEvent";
import { Client, Guild, Message } from "discord.js";
import { ICommand } from "./ICommand";

export type DiscordEventData<T = {}> = {
  client: Client;
  message?: Message;
  guild?: Guild;
  commands: ICommand[];
  id?: string; // guildCreate
  name?: string; // guildCreate
} & T;

export interface IDiscordEvent {
  info(): DiscordEvent;
  execute(props: DiscordEventData): Promise<void> | void;
}
