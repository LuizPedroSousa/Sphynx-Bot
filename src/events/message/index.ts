import { MessageEvent } from "./MessageEvent";
import { MessageEventInfo } from "./MessageEventInfo";

const messageEventInfo = new MessageEventInfo();
const messageEvent = new MessageEvent(messageEventInfo);

export { messageEvent };
