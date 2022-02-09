import "./shared/infra/orm/connection";
import "reflect-metadata";
import "./shared/container";
import "dotenv/config";
import { DiscordClient } from "./shared/services/DiscordClient";
import { container } from "tsyringe";

class App {
  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    const discordClient = container.resolve(DiscordClient);

    discordClient.handle();
  }
}

new App();
