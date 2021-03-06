process.env["NODE_CONFIG_DIR"] = __dirname + "/../../src/config";
console.log((process.env["NODE_CONFIG_DIR"] = __dirname + "/../../src/config"));
import { ResponseClient } from "discord-response-mock";
import dotenv from "dotenv";
dotenv.config();
let client: ResponseClient;

const options = {
  messagePrefix: "$",
  specificUserId: process.env.DISCORD_BOT_ID as string,
};

beforeAll(async () => {
  client = await new ResponseClient(options).connect(
    process.env.DISCORD_TEST_BOT_TOKEN as string,
    process.env.DISCORD_TEST_GUILD_ID as string
  );
});

afterAll(async () => {
  await client.cleanup();
});

describe("Ping command", () => {
  it("should send a server status", async () => {
    const response = await client.write("ping");

    const startMessage = response.content.startsWith(
      `${response.client.user} **Minha latΓͺncia atual:**`
    );

    expect(startMessage).toBe(true);
  });

  it("should contains at less one emoji of shardIcons", async () => {
    const shardIcons = [
      "π Watermelon",
      "π° Cake",
      "π₯­ Mango",
      "π Strawberry",
      "π₯ Rose",
      "π» Sunflower",
      "π₯ Waffle",
      "πͺ Cookie",
    ];

    const response = await client.write("ping");

    const regex = new RegExp(`(${shardIcons.join("|")})`, "ig");

    expect(regex.test(response.content)).toBe(true);
  });
});
