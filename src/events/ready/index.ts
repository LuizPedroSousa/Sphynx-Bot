import logger from "@/utils/logger";
import { ReadyEvent } from "./ReadyEvent";

const readyEvent = new ReadyEvent(logger);

export { readyEvent };
