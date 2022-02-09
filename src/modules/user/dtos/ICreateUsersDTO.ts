import { Server } from "@/modules/server/infra/typeorm/entities/Server";
import { UserAttributes } from "../infra/typeorm/entities/User";

export interface ICreateUsersDTO {
  users: UserAttributes[];
}
