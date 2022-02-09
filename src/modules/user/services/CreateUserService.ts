import { DiscordException } from "@/shared/exceptions/DiscordException";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ idDiscord, server, ...userData }: ICreateUserDTO) {
    const userAlreadyExits = await this.userRepository.findOne({
      idDiscord,
    });

    console.log(idDiscord, "asd");

    if (userAlreadyExits) {
      throw new DiscordException({});
    }

    const user = new User({ idDiscord, servers: [server], ...userData });

    return this.userRepository.create(user);
  }
}
