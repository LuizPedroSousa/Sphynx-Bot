import { DiscordEvent } from "@/entities/DiscordEvent";

export class ReadyEventInfo {
  execute(): DiscordEvent {
    return new DiscordEvent({ name: "ready", once: true });
  }
}
