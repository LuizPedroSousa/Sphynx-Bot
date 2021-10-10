import { Server } from ".prisma/client";
import { Server as ServerEntity } from "@/entities/Server";

export interface ServerRepository {
  findServerById(server_id: string): Promise<Server | null>;
  findServerByIdDiscord(idDiscord: string): Promise<Server | null>;
  createServer(server: ServerEntity): Promise<void>;
}
