import { Command } from "@/entities/Command";
import { Message } from "discord.js/typings/index.js";

export interface ExecuteCommandData {
  message: Message;
  args: string[];
  prefix?: string;
}

export interface ICommand {
  info(): Command;
  execute(data: ExecuteCommandData): Promise<any> | void;
  validate?(): Promise<boolean>;
}
