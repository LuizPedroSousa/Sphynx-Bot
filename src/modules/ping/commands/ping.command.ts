import { Command } from "@/entities/Command";
import { ExecuteCommandData, ICommand } from "@/shared/core/ICommand";
import { inject, injectable } from "tsyringe";
import { PingCommandInfo } from "../PingCommandInfo";
import { PingCommandView } from "../views/pingCommand.view";

@injectable()
export class PingCommand implements ICommand {
  constructor(
    @inject(PingCommandInfo)
    private pingCommandInfo: PingCommandInfo,
    @inject(PingCommandView)
    private pingCommandView: PingCommandView
  ) {}

  info(): Command {
    return this.pingCommandInfo.execute();
  }

  execute({ message }: ExecuteCommandData): void {
    const { shards } = message.client.ws;

    const currentShard = shards.find(
      (shard) => shard.id === message?.guild?.shardId
    );

    const response = this.pingCommandView.render({ currentShard, message });

    message.react("🐳");
    message.reply(response);
  }
}
