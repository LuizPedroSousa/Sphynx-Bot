import { IServerRepository } from "@/modules/server/repositories/IServerRepository";
import { DiscordException } from "@/shared/exceptions/DiscordException";
import logger from "@/shared/utils/logger";
import { LogError } from "concurrently";
import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
export class CreateUsersService {
  constructor(
    @inject("UserRepository")
    readonly userRepository: IUserRepository,

    @inject("ServerRepository")
    readonly serverRepository: IServerRepository
  ) {}

  async execute({ users }: ICreateUsersDTO) {
    const usersToCreate = await Promise.all(
      users
        .map(async (user) => {
          if (!user.idDiscord) {
            logger.info(`User ${user.name} has no idDiscord`);
            return;
          }

          const userAlreadyExists = await this.userRepository.findOne({
            idDiscord: user.idDiscord,
          });

          if (!userAlreadyExists) {
            return new User(user);
          }
          logger.info(`user ${user.name} already exists`);
        })
        .filter((user) => user)
    );

    console.log(usersToCreate);

    if (!usersToCreate.length) {
      throw new DiscordException({ message: "Nenhum usuário para criar" });
    }

    const createdUsers = await this.userRepository.createUsers(usersToCreate);

    logger.success(
      `de ${createdUsers.length} usuários, ${users.length} foram criados.`
    );
  }
}
