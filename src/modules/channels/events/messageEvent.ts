import { DiscordException } from "@/shared/exceptions/DiscordException";
import { DiscordEventData, IDiscordEvent } from "@/shared/core/IDiscordEvent";
import { container, inject, injectable } from "tsyringe";
import { ValidateAuthorService } from "../services/ValidateAuthorService";
import { ValidatePrefixService } from "../services/ValidatePrefixService";
import { ValidateCommandService } from "../services/ValidateCommandService";
import logger from "@/shared/utils/logger";
import { DiscordEvent } from "@/entities/DiscordEvent";

@injectable()
export class MessageEvent implements IDiscordEvent {
  constructor(
    @inject(ValidateCommandService)
    private validateCommandService: ValidateCommandService
  ) {}

  info() {
    return new DiscordEvent({ name: "messageCreate" });
  }

  async execute({
    message,
    commands,
    client,
    guild,
  }: DiscordEventData): Promise<void> {
    try {
      const validatePrefixService = container.resolve(ValidatePrefixService);
      const validateAuthorService = container.resolve(ValidateAuthorService);

      if (!message) {
        throw new DiscordException({ message: "message has not provided" });
      }

      const user = await validateAuthorService.execute({
        author: message.author,
        bot: client.user,
      });

      const prefix = await validatePrefixService.execute({
        message,
        user,
      });

      const { command, args } = this.validateCommandService.execute({
        message,
        commands,
        prefix,
      });

      await command.execute({ message, prefix, args });
    } catch (error: any) {
      if (error instanceof DiscordException) {
        if (error.message) {
          message?.channel.send({
            content: error?.message,
          });
        }
        return;
      }
      console.log(error);
    }
  }
}
