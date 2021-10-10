import { MessageEventValidateAuthorDTO } from "../MessageEventDTO";

export class MessageEventValidateAuthor {
  execute({ author, bot }: MessageEventValidateAuthorDTO): boolean {
    let isValid = true;

    if (author.id === bot?.id) {
      isValid = false;
    }

    return isValid;
  }
}
