import postgresServerRepository from "@/repositories/implementations/PostgresServerRepository";
import { MessageEvent } from "./MessageEvent";
import { MessageEventInfo } from "./MessageEventInfo";
import { MessageEventValidate } from "./MessageEventValidate";
const messageEventInfo = new MessageEventInfo();
const messageEventValidate = new MessageEventValidate(postgresServerRepository);

const messageEvent = new MessageEvent(messageEventInfo, messageEventValidate);

export { messageEvent };
