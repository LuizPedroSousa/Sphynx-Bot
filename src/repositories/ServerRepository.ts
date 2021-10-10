import { Server } from ".prisma/client";

export interface ServerRepository {
  findServerById(server_id: string): Promise<Server | null>;
}
