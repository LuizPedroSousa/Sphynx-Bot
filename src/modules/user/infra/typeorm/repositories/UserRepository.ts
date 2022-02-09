import { IUserRepository } from "@/modules/user/repositories/IUserRepository";
import { assignDefinedObjectValues } from "@/shared/utils/assignDefinedObjectValues";
import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(data: User): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  async findOne(where?: object): Promise<User> {
    return this.ormRepository.findOne(assignDefinedObjectValues({ where }));
  }

  async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  async createUsers(users: User[]): Promise<User[]> {
    return this.ormRepository.save(users);
  }
}
