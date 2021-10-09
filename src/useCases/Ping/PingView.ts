import { PingResponseDTO } from "@/dtos/PingDTO";

export class PingView {
  render() {
    return new PingResponseDTO();
  }
}
