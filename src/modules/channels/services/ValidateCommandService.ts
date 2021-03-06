import { DiscordException } from "@/shared/exceptions/DiscordException";
import { ICommand } from "@/shared/core/ICommand";
import { injectable } from "tsyringe";
import { ValidateCommandDTO } from "../dtos/ValidateCommand.dto";

@injectable()
export class ValidateCommandService {
  execute({ message, commands, prefix }: ValidateCommandDTO): {
    args: string[];
    command: ICommand;
  } {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/ +/);

    const commandName = args?.shift()?.toLowerCase();

    const command = commands.find((command) => {
      const { name, aliases } = command.info();
      return (
        commandName?.startsWith(name) ||
        aliases.some((alias) => commandName?.startsWith(alias))
      );
    });

    if (!command) {
      throw new DiscordException({
        message: `O comando \`${prefix}${commandName}\` não existe.`,
      });
    }

    const commandInfo = command.info();

    const guildMember = message.guild?.members.cache.get(message?.author.id);

    if (
      (commandInfo.permissions?.length &&
        commandInfo?.permissions[0] === "ADMINISTRATOR") ||
      !guildMember
    ) {
      throw new DiscordException({
        message: `O comando \`${prefix}${commandInfo?.name}\` é restrito.`,
      });
    }

    return { command, args };
  }
}
