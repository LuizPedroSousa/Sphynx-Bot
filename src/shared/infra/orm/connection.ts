import { createConnections } from "typeorm";

import { getConnection } from "typeorm";
if (process.env.NODE_ENV !== "test") {
  createConnections();
}
