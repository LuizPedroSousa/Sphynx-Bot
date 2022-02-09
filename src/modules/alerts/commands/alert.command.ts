import { Command } from "@/entities/Command";
import { ICommand, ExecuteCommandData } from "@/shared/core/ICommand";
import { container, injectable } from "tsyringe";

import cron from "node-cron";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import { AlertCommandView } from "../views/alertCommand.view";
import { Message } from "discord.js";

let task: cron.ScheduledTask;
@injectable()
export class AlertCommand implements ICommand {
  public info(): Command {
    return new Command({
      name: "alert",
      description: "alert",
      aliases: ["alert", "aviso"],
    });
  }

  public async execute({
    message,
    args,
  }: ExecuteCommandData): Promise<Message> {
    const alertCommandView = container.resolve(AlertCommandView);

    if (args.length > 1) {
      throw new DiscordException({
        message: "Este comando não aceita mais de um argumento",
      });
    }

    const arg = args[0];

    task = cron.schedule("10 * * * * *", () => {
      message.channel.send(`Aviso @everyone`);
    });

    if (/start/gi.test(arg)) {
      task.start();
      const response = alertCommandView.render({ message, status: "start" });
      return message.reply(response);
    }

    if (/stop/gi.test(arg)) {
      task.stop();
      const response = alertCommandView.render({ message, status: "stop" });
      return message.reply(response);
    }

    throw new DiscordException({
      message: `
Uso errado do commando, tente algo a baixo utilize
> \`alert start(inicia agendamento de alertas)\`
> \`alert stop(cancela agendamento de alertas)\`
`,
    });
  }
}
