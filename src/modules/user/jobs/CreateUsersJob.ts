import {
  IJobProvider,
  IQueues,
} from "@/shared/container/providers/QueueProvider/models/IQueueProvider";
import { container, injectable } from "tsyringe";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { CreateUserService } from "../services/CreateUserService";

@injectable()
export class CreateUsersJob implements IJobProvider {
  public get key(): IQueues {
    return "createUsers";
  }

  public async execute(user: ICreateUserDTO) {
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute(user);
  }
}
