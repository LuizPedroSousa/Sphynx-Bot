import { AlertCommand } from "@/modules/alerts/commands/alert.command";
import { PingCommand } from "@/modules/ping/commands/ping.command";
import { AddRoleCommand } from "@/modules/roles/commands/addRoleCommand";
import { ICommand } from "@/shared/core/ICommand";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import logger from "@/shared/utils/logger";
import { container } from "tsyringe";

export const RegisterCommandsService = (): ICommand[] => {
  const pingCommand = container.resolve(PingCommand);
  const alertCommand = container.resolve(AlertCommand);
  const addRole = container.resolve(AddRoleCommand);

  const commands: ICommand[] = [pingCommand, alertCommand, addRole];

  if (!commands.length) {
    throw new DiscordException({ message: "Discord error" });
  }

  logger.success("Commands registered with successfully");

  return commands;
};
