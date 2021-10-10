import { PermissionFlags } from "discord.js";

type Permissions = keyof PermissionFlags;

export class Command {
  public name: string;
  public aliases: string[];
  public description: string;
  public delay?: number = 0;
  public permissions?: Permissions[] = [];
  public cooldowns?: number = 0;

  constructor(props: Command) {
    Object.assign(this, props);
  }
}
