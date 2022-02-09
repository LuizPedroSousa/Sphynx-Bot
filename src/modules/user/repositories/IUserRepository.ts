import { User } from "../infra/typeorm/entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(where?: object): Promise<User>;
  delete(user: User): Promise<void>;
  createUsers(users: User[]): Promise<User[]>;
}
