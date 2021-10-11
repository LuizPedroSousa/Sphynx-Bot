import { Server } from "@/entities/Server";

type ServerDTO = Omit<Server, "id" | "insertedAt" | "prefix" | "users">;

export interface CreateServerRequestDTO {
  server: ServerDTO;
}
