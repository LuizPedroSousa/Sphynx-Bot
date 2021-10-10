import { Command } from "@/entities/Command";
import { ExecuteCommandData, ICommand } from "@/interfaces/ICommand";
import { PingCommandInfo } from "./PingCommandInfo";
import { PingCommandView } from "./PingCommandView";

export class PingCommand implements ICommand {
  private pingCommandInfo: PingCommandInfo;
  private pingCommandView: PingCommandView;
  constructor() {
    this.pingCommandInfo = new PingCommandInfo();
    this.pingCommandView = new PingCommandView();
  }

  info(): Command {
    const commandInfo = this.pingCommandInfo.execute();
    return commandInfo;
  }

  execute({ message }: ExecuteCommandData): void {
    const { shards } = message.client.ws;

    const currentShard = shards.find(
      (shard) => shard.id === message?.guild?.shardId
    );

    const response = this.pingCommandView.render({ currentShard, message });

    message.reply(response);
  }
}
