import { Server } from "../infra/typeorm/entities/Server";

export interface IServerRepository {
  findServerById(server_id: string): Promise<Server | undefined>;
  findServerByIdDiscord(idDiscord: string): Promise<Server | undefined>;
  createServer(server: Server): Promise<Server>;
}
