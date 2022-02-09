process.env["NODE_CONFIG_DIR"] = __dirname + "/../config";
import { discordClientConfig } from "@/config/discordClientConfig";
import { RegisterCommandsService } from "@/shared/services/RegisterCommandsService";
import { ICommand } from "@/shared/core/ICommand";
import { IDiscordEvent } from "@/shared/core/IDiscordEvent";
import { Client } from "discord.js";
import { config } from "dotenv";
import { registerEvents } from "./RegisterEvents";
import { injectable } from "tsyringe";

@injectable()
export class DiscordClient {
  public client: Client;
  public commands: ICommand[];
  public events: IDiscordEvent[];

  constructor() {
    config();
    this.client = new Client(discordClientConfig);
  }

  public handle() {
    this.commands = RegisterCommandsService();
    registerEvents(this.client, this.commands);
    this.initializeClient();
  }

  private async initializeClient() {
    await this.client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
