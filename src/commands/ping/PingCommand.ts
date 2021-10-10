import { Command } from "@/entities/Command";
import { ICommand } from "@/interfaces/ICommand";
import { Message } from "discord.js/typings/index.js";
import { PingCommandInfo } from "./PingCommandInfo";

export class PingCommand implements ICommand {
  constructor(private pingCommandInfo: PingCommandInfo) {}

  execute(message: Message, args: string[]): Command {
    const commandInfo = this.pingCommandInfo.execute();
    return commandInfo;
  }
}
