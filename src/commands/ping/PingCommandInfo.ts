import { Command } from "@/entities/Command";

export class PingCommandInfo {
  execute(): Command {
    return new Command({
      name: "ping",
      cooldowns: 2,
      description: "Retorna o status do Sphynx",
      aliases: ["status"],
    });
  }
}
