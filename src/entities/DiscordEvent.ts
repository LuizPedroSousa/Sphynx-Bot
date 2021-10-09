import { ClientEvents } from "discord.js/typings/index.js";

export class DiscordEvent {
  public name: keyof ClientEvents;
  public once?: boolean = false;

  constructor(props: DiscordEvent) {
    Object.assign(this, props);
  }
}
