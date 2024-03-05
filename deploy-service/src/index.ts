import { commandOptions, createClient } from "redis";
const subscriber = createClient();

subscriber.connect();

async function main() {
  while (1) {
    const response = await subscriber.brPop(commandOptions({isolated: true}), "new-queue", 0);
    console.log('response', response);
  }
}
main();