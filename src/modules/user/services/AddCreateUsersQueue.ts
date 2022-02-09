import { IQueueProvider } from "@/shared/container/providers/QueueProvider/models/IQueueProvider";
import { inject, injectable } from "tsyringe";
import { IAddCreateUsersQueueDTO } from "../dtos/IAddCreateUsersQueueDTO";

@injectable()
export class AddCreateUsersQueue {
  constructor(
    @inject("QueueProvider")
    private readonly queueProvider: IQueueProvider
  ) {}

  async execute({ users }: IAddCreateUsersQueueDTO) {
    await Promise.all(
      users.map((user) => {
        return this.queueProvider.addJob("createUsers", user);
      })
    );
  }
}
