import { PingCommandInfo } from "./PingCommandInfo";
import { PingCommandUseCase } from "./PingCommandUseCase";

const pingCommandInfo = new PingCommandInfo();
const pingCommandUseCase = new PingCommandUseCase(pingCommandInfo);

export { pingCommandUseCase };
