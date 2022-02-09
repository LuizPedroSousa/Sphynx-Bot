import { User } from "@/modules/user/infra/typeorm/entities/User";
import { IUserRepository } from "@/modules/user/repositories/IUserRepository";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import { inject, injectable } from "tsyringe";
import { ValidateMessageAuthorDTO } from "../dtos/ValidateMessageAuthor.dto";

@injectable()
export class ValidateAuthorService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({
    author,
    bot,
  }: ValidateMessageAuthorDTO): Promise<User | undefined> {
    let userAlreadyExits = await this.userRepository.findOne({
      idDiscord: author.id,
    });

    if (!userAlreadyExits) {
      const user = new User({
        avatar_url: author.displayAvatarURL(),
        idDiscord: author.id,
        name: author.username,
        discriminator: author.discriminator,
        servers: [],
        system: author.id === bot?.id,
      });
      userAlreadyExits = await this.userRepository.create(user);
    }

    if (author.id === bot?.id) {
      throw new DiscordException({});
    }

    return userAlreadyExits;
  }
}
