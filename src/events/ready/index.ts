import logger from "@/utils/logger";
import { ReadyEvent } from "./ReadyEvent";
import { ReadyEventInfo } from "./ReadyEventInfo";

const readyEventInfo = new ReadyEventInfo();
const readyEvent = new ReadyEvent(readyEventInfo, logger);

export { readyEvent };
