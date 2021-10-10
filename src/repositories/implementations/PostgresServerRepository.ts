import { Server } from ".prisma/client";
import { client } from "@/prisma/client";
import { ServerRepository } from "../ServerRepository";
import { Server as ServerEntity } from "@/entities/Server";
class PostgresServerRepository implements ServerRepository {
  async findServerById(server_id: string): Promise<Server | null> {
    const server = await client.server.findUnique({ where: { id: server_id } });
    return server;
  }

  async findServerByIdDiscord(idDiscord: string): Promise<Server | null> {
    const server = await client.server.findUnique({ where: { idDiscord } });
    return server;
  }

  async createServer(server: ServerEntity): Promise<void> {
    await client.server.create({ data: { ...server } });
  }
}

export default new PostgresServerRepository();
