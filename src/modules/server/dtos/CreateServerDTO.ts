import { ServerAttributes } from "@/modules/server/infra/typeorm/entities/Server";

export interface CreateServerRequestDTO {
  server: ServerAttributes;
}
