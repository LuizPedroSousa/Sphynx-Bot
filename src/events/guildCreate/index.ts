import { createServerUseCase } from "@/useCases/CreateServer";
import { GuildCreateEvent } from "./GuildCreateEvent";

const guildCreateEvent = new GuildCreateEvent(createServerUseCase);

export { guildCreateEvent };
