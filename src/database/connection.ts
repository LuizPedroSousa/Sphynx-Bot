import { client } from "@/prisma/client";
import logger from "../utils/logger";

class CreateDatabaseConnection {
  async connect() {
    try {
      await client.$connect();
      logger.success(`Sucesso ao conectar com o Postgres. 🔥`);
    } catch (err: any) {
      logger.error(`Erro ao tentar conectar no Postgres 🚨`, err);
    }
  }
}

export default new CreateDatabaseConnection();
