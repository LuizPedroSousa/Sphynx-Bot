import { User as DiscordUser } from "discord.js";

export interface ValidateMessageAuthorDTO {
  author: DiscordUser;
  bot: DiscordUser | null;
}
