import { PingResponseDTO } from "@/useCases/Ping/PingDTO";

export class PingView {
  render() {
    return new PingResponseDTO();
  }
}
