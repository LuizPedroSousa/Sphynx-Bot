import config from "config";
import { Message } from "discord.js";

class MessageEventValidatePrefix {
  execute(message: Message) {
    const finalPrefix = config.get("bot.prefix");

    
  }
}
