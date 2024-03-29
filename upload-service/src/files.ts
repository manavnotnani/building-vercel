

import fs from "fs";
import path from "path";
import { uploadFiles } from "./aws";
export const getAllFiles = (folderPath: string) => {
  let response: string[] = [];
  const allFiles = fs.readdirSync(folderPath);
  allFiles.forEach((file) => {
    const fullFilePath = path.join(folderPath, file);
    if (fs.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath));
    } else {
      response.push(fullFilePath);
    }
  });
  console.log("response", response);
  return response;
};

// getAllFiles(`./build/output/jj14k`);

