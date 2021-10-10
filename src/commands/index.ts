import { ICommand } from "@/interfaces/ICommand";
import { pingCommand } from "./ping";

const commands: ICommand[] = [pingCommand];

export { commands };
