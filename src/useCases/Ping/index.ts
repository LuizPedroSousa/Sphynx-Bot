import { PingController } from "@/useCases/Ping/PingController";
import { PingView } from "@/useCases/Ping/PingView";

const pingView = new PingView();
const pingController = new PingController(pingView);

export { pingController };
