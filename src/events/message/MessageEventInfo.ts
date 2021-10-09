import { DiscordEvent } from "@/entities/DiscordEvent";

export class MessageEventInfo {
  execute(): DiscordEvent {
    return new DiscordEvent({ name: "messageCreate" });
  }
}
