import { PermissionFlags } from "discord.js";

export class Command {
  public name: string;
  public aliases: string[];
  public description: string;
  public delay?: number = 0;
  public permissions?: PermissionFlags[] = [];
  public cooldowns?: number = 0;

  constructor(props: Command) {
    Object.assign(this, props);
  }
}
