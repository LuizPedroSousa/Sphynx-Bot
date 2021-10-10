process.env["NODE_CONFIG_DIR"] = __dirname + "/../config";
import { commands } from "@/commands";
import { discordClientConfig } from "@/config/discordClientConfig";
import { events } from "@/events";
import { HttpException } from "@/exceptions/HttpException";
import { ICommand } from "@/interfaces/ICommand";
import { DiscordEventData, IDiscordEvent } from "@/interfaces/IDiscordEvent";
import logger from "@/utils/logger";
import { Client, Message } from "discord.js";
import { config } from "dotenv";

export class DiscordClient {
  public client: Client;
  public commands: ICommand[];
  public events: IDiscordEvent[];

  constructor() {
    config();
    this.commands = commands;
    this.events = events;
    this.client = new Client(discordClientConfig);
    this.registerCommands();
    this.registerEvents();
    this.initializeClient();
  }

  private registerCommands() {
    if (!this.commands.length) {
      throw new HttpException({ message: "Discord error" });
    }
    logger.success("Commands registered with successfully");
  }

  private registerEvents() {
    this.events.forEach((event) => {
      const eventInfo = event.info();

      if (eventInfo.once) {
        this.client.once(eventInfo.name, (...args: any) => {
          event.execute({ client: this.client, ...args });
        });
      } else {
        this.client.on(eventInfo.name as any, (args: any) => {
          let props: DiscordEventData = {
            client: this.client,
            commands: this.commands,
          };

          if (args.author) {
            props["message"] = args;
          } else {
            props = { ...props, ...args };
          }

          return event.execute(props);
        });
      }
    });

    logger.success("Events registered with successfully");
  }

  private async initializeClient() {
    await this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
