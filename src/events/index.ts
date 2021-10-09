import { IDiscordEvent } from "@/interfaces/IDiscordEvent";
import { messageEvent } from "./message";
import { readyEvent } from "./ready";

const events: IDiscordEvent[] = [readyEvent, messageEvent];

export { events };
