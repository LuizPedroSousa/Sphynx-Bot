import { IDiscordEvent } from "@/interfaces/IDiscordEvent";
import { guildCreateEvent } from "./guildCreate";
import { messageEvent } from "./message";
import { readyEvent } from "./ready";

const events: IDiscordEvent[] = [readyEvent, messageEvent, guildCreateEvent];

export { events };
