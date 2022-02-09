import { ICommand } from "@/shared/core/ICommand";
import { Message } from "discord.js";

export interface ValidateCommandDTO {
  prefix: string;
  message: Message;
  commands: ICommand[];
}
