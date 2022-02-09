import { Message, Guild } from "discord.js";
import { User } from "@modules/user/infra/typeorm/entities/User";

export interface ValidateMessagePrefixDTO {
  message: Message;
  user: User;
}
