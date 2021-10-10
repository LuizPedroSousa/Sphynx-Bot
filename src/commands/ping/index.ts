import { PingCommand } from "./PingCommand";
import { PingCommandInfo } from "./PingCommandInfo";

const pingCommandInfo = new PingCommandInfo();
const pingCommand = new PingCommand(pingCommandInfo);

export { pingCommand };
