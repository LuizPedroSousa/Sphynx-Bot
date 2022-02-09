import { GuildCreateEvent } from "@/modules/channels/events/guildCreateEvent";
import { MessageEvent } from "@/modules/channels/events/messageEvent";
import { ReadyEvent } from "@/modules/channels/events/readyEvent";
import { container } from "tsyringe";
import { ICommand } from "../core/ICommand";
import { DiscordEventData, IDiscordEvent } from "../core/IDiscordEvent";
import logger from "../utils/logger";
import { Client } from "discord.js";
import { VoiceStateUpdateEvent } from "@/modules/channels/events/voiceStateUpdate.event";
import { GuildMemberRemoveEvent } from "@/modules/channels/events/guildMemberRemoveEvent";
import { GuildMemberAddEvent } from "@/modules/channels/events/guildMemberAddEvent";

export const registerEvents = (client: Client, commands: ICommand[]): void => {
  const messageEvent = container.resolve(MessageEvent);
  const guildCreateEvent = container.resolve(GuildCreateEvent);
  const readyEvent = container.resolve(ReadyEvent);
  const voiceStateUpdateEvent = container.resolve(VoiceStateUpdateEvent);
  const guildMemberRemoveEvent = container.resolve(GuildMemberRemoveEvent);
  const guildMemberAddEvent = container.resolve(GuildMemberAddEvent);

  const events: IDiscordEvent[] = [
    readyEvent,
    messageEvent,
    guildCreateEvent,
    voiceStateUpdateEvent,
    guildMemberRemoveEvent,
    guildMemberAddEvent,
  ];

  for (const event of events) {
    const eventInfo = event.info();

    if (eventInfo.once) {
      client.once(eventInfo.name, async (...args: any) => {
        await event.execute({ client, ...args });
      });
    } else {
      client.on(eventInfo.name as any, async (args: any) => {
        let props: DiscordEventData = {
          client,
          commands,
        };

        if (args.author) {
          props["message"] = args;
        } else {
          props = { ...props, ...args };
        }

        return await event.execute(props);
      });
    }
  }

  logger.success("Events registered with successfully");
};
