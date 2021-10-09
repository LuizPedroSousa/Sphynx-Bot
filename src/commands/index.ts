import { ICommand } from "@/interfaces/ICommand";
import { pingCommandUseCase } from "./PingCommand";

const commands: ICommand[] = [pingCommandUseCase];

export { commands };
