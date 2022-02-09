import { DiscordEvent } from "@/entities/DiscordEvent";
import { DiscordEventData, IDiscordEvent } from "@/shared/core/IDiscordEvent";
import { VoiceState } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export class VoiceStateUpdateEvent implements IDiscordEvent {
  public info(): DiscordEvent {
    return new DiscordEvent({ name: "voiceStateUpdate", once: true });
  }

  public async execute({
    "0": oldState,
    "1": newState,
  }: DiscordEventData<{ 0: VoiceState; 1: VoiceState }>): Promise<void> {
  }
}
