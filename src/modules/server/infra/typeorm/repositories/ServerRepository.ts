import { Server } from "@/modules/server/infra/typeorm/entities/Server";
import { IServerRepository } from "@/modules/server/repositories/IServerRepository";
import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";

@injectable()
export class ServerRepository implements IServerRepository {
  private ormRepository: Repository<Server>;

  constructor() {
    this.ormRepository = getRepository(Server);
  }

  async findServerById(server_id: string): Promise<Server | undefined> {
    return this.ormRepository.findOne(server_id);
  }

  async findServerByIdDiscord(idDiscord: string): Promise<Server | undefined> {
    return await this.ormRepository.findOne({ where: { idDiscord } });
  }

  async createServer(data: Server): Promise<Server> {
    const server = await this.ormRepository.create(data);

    return await this.ormRepository.save(server);
  }
}
