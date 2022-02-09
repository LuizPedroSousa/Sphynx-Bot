import { Command } from "@/entities/Command";
import { ExecuteCommandData, ICommand } from "@/shared/core/ICommand";
import { injectable } from "tsyringe";

@injectable()
export class AddRoleCommand implements ICommand {
  info(): Command {
    return new Command({
      name: "role",
      description: "Adiciona um cargo a um usuário",
      aliases: ["role", "charge"],
    });
  }

  async execute({ message, args }: ExecuteCommandData) {
    console.log(await message.guild.roles.fetch());

    message.reply("Comando não implementado");
  }
}
