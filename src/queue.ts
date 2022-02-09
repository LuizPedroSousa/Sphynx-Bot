import "reflect-metadata";
import "./shared/container";
import "./shared/infra/orm/connection";
import "dotenv/config";
import { container } from "tsyringe";
import { IQueueProvider } from "./shared/container/providers/QueueProvider/models/IQueueProvider";

class Queue {
  constructor() {
    this.handle();
  }
  async handle() {
    const queueProvider = container.resolve<IQueueProvider>("QueueProvider");
    await queueProvider.processQueue();
  }
}
new Queue();
