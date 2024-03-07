import AWS from "aws-sdk";
import fs from "fs";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
  endpoint: process.env.ENDPOINT,
});

export async function downloadS3Folder(prefix: string) {
    console.log("downloading", prefix);
    
  const allFiles = await s3
    .listObjectsV2({
      Bucket: "vercel",
      Prefix: prefix,
    })
    .promise();

    console.log('allFiles', allFiles);
  const allPromises = allFiles.Contents?.map(async ({ Key }) => {
    return (
      new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }
        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);

        const dirname = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirname)) {
          fs.mkdirSync(dirname, { recursive: true });
        }

        s3.getObject({
          Bucket: "vercel",
          Key,
        })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            resolve("");
          });
      }) || []
    );
  });
  console.log("awaiting");

  await Promise.all(allPromises?.filter((x) => x !== undefined) || []);
}

export async function uploadFiles(fileName: string, filePath: string) {
    const fileContent = fs.readFileSync(filePath);
    const response = await s3
      .upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
      })
      .promise();
  }
  
