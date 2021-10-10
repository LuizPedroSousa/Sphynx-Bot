import { Server } from "./Server";
import { v4 as uuid } from "uuid";

export class User {
  public readonly id: string;
  public idDiscord: string;
  public avatar_url: string;
  public name: string;
  public discriminator: string;
  public system?: boolean = false;
  public readonly insertedAt?: Date;
  public servers: Server[];

  constructor(props: Omit<User, "id" | "insertedAt" | "system">, id?: string) {
    Object.assign(this, props);

    if (!this.insertedAt) {
      this.insertedAt = new Date();
    }

    if (!this.id) {
      this.id = uuid();
    }
  }
}
