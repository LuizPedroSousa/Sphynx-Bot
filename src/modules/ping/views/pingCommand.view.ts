import { Message, WebSocketShard } from "discord.js/typings/index.js";
import { PingCommandResponseDTO } from "../dtos/pingCommand.dto";

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
      "π Watermelon",
      "π° Cake",
      "π₯­ Mango",
      "π Strawberry",
      "π₯ Rose",
      "π» Sunflower",
      "π₯ Waffle",
      "πͺ Cookie",
    ];

    return {
      content: `${message.author} **Minha latΓͺncia atual:**
> π Bot \`${Math.round(message.client.ws.ping)}ms\`
> π DB  \`10ms\`
> π‘ Shard \` #${currentShard?.id} ${shardIcons[currentShard?.id || 0]}\`
      `,
    };
  }
}
