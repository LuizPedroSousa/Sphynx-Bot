import { User } from "./User";
import { v4 as uuid } from "uuid";
import config from "config";

export class Server {
  public readonly id: string;
  public idDiscord: string;
  public name: string;
  public prefix?: String;
  public readonly insertedAt: Date;
  public users?: User[];

  constructor(props: Omit<Server, "id" | "insertedAt">) {
    Object.assign(this, props);

    if (!this.prefix) {
      this.prefix = config.get("bot.prefix");
    }

    if (!this.insertedAt) {
      this.insertedAt = new Date();
    }

    if (!this.id) {
      this.id = uuid();
    }
  }
}
