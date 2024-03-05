import AWS from "aws-sdk";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETACCESSKEY,
  endpoint: process.env.ENDPOINT,
});

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
