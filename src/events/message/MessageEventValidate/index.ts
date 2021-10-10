import { ServerRepository } from "@/repositories/ServerRepository";
import { MessageEventValidateDTO } from "../MessageEventDTO";
import { MessageEventValidateAuthor } from "./MessageValidateAuthor";
import { MessageEventValidateCommand } from "./MessageValidateCommand";
import { MessageEventValidatePrefix } from "./MessageValidatePrefix";

export class MessageEventValidate {
  private messageEventValidateAuthor: MessageEventValidateAuthor;
  private messageEventValidateCommand: MessageEventValidateCommand;
  private messageEventValidatePrefix: MessageEventValidatePrefix;

  constructor(private serverRepository: ServerRepository) {
    this.messageEventValidateCommand = new MessageEventValidateCommand();
    this.messageEventValidateAuthor = new MessageEventValidateAuthor();
    this.messageEventValidatePrefix = new MessageEventValidatePrefix(
      this.serverRepository
    );
  }

  async execute({
    server,
    message,
    client,
    commands,
  }: MessageEventValidateDTO) {
    this.messageEventValidateAuthor.execute({
      author: message.author,
      bot: client.user,
    });

    const prefix = await this.messageEventValidatePrefix.execute({
      server,
      message,
    });

    const { command, args } = this.messageEventValidateCommand.execute({
      message,
      commands,
      prefix,
    });

    return { command, prefix, args };
  }
}
