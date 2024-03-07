import { commandOptions, createClient } from "redis";
import { downloadS3Folder, uploadFiles } from "./aws";
import { buildProject, copyFinalDist } from "./utils";
import path from "path";
import fs from "fs";
const subscriber = createClient();

subscriber.connect();

async function main() {
  while (1) {
    const response = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "new-queue",
      0
    );
    console.log("response", response);

    const id = response?.element;

    await downloadS3Folder(`output/${id}`);
    console.log("downloaded");
    await buildProject(id as string);

    console.log("final build made");

    copyFinalDist(id as string);
    console.log("build copied to S3 as well")
  }
}
main();
