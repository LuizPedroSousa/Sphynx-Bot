import { Message, WebSocketShard } from "discord.js/typings/index.js";
import { PingCommandResponseDTO } from "./PingCommandDTO";

interface PingCommandViewData {
  message: Message;
  currentShard: WebSocketShard | undefined;
}

export class PingCommandView {
  render({
    currentShard,
    message,
  }: PingCommandViewData): PingCommandResponseDTO {
    const shardIcons = [
      "🍉 Watermelon",
      "🍰 Cake",
      "🥭 Mango",
      "🍓 Strawberry",
      "🥀 Rose",
      "🌻 Sunflower",
      "🥞 Waffle",
      "🍪 Cookie",
    ];

    return {
      content: `${message.author} **Minha latência atual:**
> 🏓 Bot \`${Math.round(message.client.ws.ping)}ms\`
> 📚 DB  \`10ms\`
> 📡 Shard \` #${currentShard?.id} ${shardIcons[currentShard?.id || 0]}\`
      `,
    };
  }
}
