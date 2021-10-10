import { Server } from ".prisma/client";
import { client } from "@/prisma/client";
import { ServerRepository } from "../ServerRepository";

class PostgresServerRepository implements ServerRepository {
  async findServerById(server_id: string): Promise<Server | null> {
    const server = await client.server.findUnique({ where: { id: server_id } });
    return server;
  }
}

export default new PostgresServerRepository();
