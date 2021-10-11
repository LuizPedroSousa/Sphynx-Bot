import { DiscordEvent } from "@/entities/DiscordEvent";

export class GuildCreateEventInfo {
  execute(): DiscordEvent {
    return new DiscordEvent({ name: "guildCreate" });
  }
}
