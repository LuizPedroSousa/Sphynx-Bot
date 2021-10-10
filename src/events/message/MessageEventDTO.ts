import { Server } from "@/entities/Server";
import { ICommand } from "@/interfaces/ICommand";
import { Client, Message, User as DiscordUser } from "discord.js";

type ServerDTO = Omit<Server, "id" | "insertedAt" | "prefix" | "users">;

export interface MessageEventValidateDTO {
  server: ServerDTO;
  client: Client;
  message: Message;
  commands: ICommand[];
}

export interface MessageEventValidatePrefixDTO {
  server: ServerDTO;
  message: Message;
}

export interface MessageEventValidateCommandDTO {
  prefix: string;
  message: Message;
  commands: ICommand[];
}

export interface MessageEventValidateAuthorDTO {
  author: DiscordUser;
  bot: DiscordUser | null;
}
