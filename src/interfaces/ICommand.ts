import { Command } from "@/entities/Command";
import { Message } from "discord.js/typings/index.js";

export interface ICommand {
  execute(
    message: Message,
    args: string[],
    prefix?: string
  ): Promise<Command> | Command;
}
