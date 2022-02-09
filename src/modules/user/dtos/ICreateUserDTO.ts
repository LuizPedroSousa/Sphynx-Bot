import { Server } from "@/modules/server/infra/typeorm/entities/Server";

export interface ICreateUserDTO {
  name: string;
  email?: string;
  idDiscord: string;
  avatar_url: string;
  discriminator: string;
  server: Server;
}
