const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGO_URL,
  NODE_ENV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const postgresConnectionConfig = {
  development: {
    host: "postgres",
    port: 5432,
    database: "sphynx",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["./src/shared/infra/orm/migrations/*.ts"],
    cli: {
      migrationsDir: "./src/shared/infra/orm/migrations",
    },
    synchronize: false
  },

  production: {
    host: "localhost",
    port: 5432,
    database: "",
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    entities: ["./dist/modules/**/infra/entities/*.js"],
    migrations: ["./dist/shared/infra/orm/migrations/*.js"],
    cli: {
      migrationsDir: "./dist/shared/infra/orm/migrations",
    },
  },
};

const mongoConnectionConfig = {
  test: {
    entities: ["./src/modules/**/infra/typeorm/schemas/*.ts"],
  },
  development: {
    entities: ["./src/modules/**/infra/typeorm/schemas/*.ts"],
  },
  production: {
    entities: ["./dist/modules/**/infra/typeorm/schemas/*.js"],
  },
};

module.exports = [
  {
    name: "default",
    type: "postgres",
    ...postgresConnectionConfig[NODE_ENV],
  },
  {
    name: "mongo",
    type: "mongodb",
    url:
      MONGO_URL || `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017`,
    useUnifiedTopology: true,
    synchronize: true,
    ...mongoConnectionConfig[NODE_ENV],
  },
];
