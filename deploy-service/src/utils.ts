import { exec } from "child_process";
import path from "path";
import { uploadFiles } from "./aws";
import fs from 'fs';

export function buildProject(id: string) {
  return new Promise((resolve) => {
    const child = exec(
      `cd ${path.join(
        __dirname,
        `output/${id}`
      )}  && npm install && npm run build`
    );

    child.stdout?.on("data", function (data) {
      console.log("stdout: " + data);
    });

    child.stderr?.on("data", function (data) {
      console.log("stderr: " + data);
    });

    child.on("close", function (code) {
      console.log("closing code: " + code);
      resolve("");
    });
  });
}

export function copyFinalDist(id: string) {
    const fileFolderPath = path.join(__dirname, `output/${id}/dist`);
    const allFiles = getAllFiles(fileFolderPath);
    allFiles.forEach(file => {
        console.log ("before", `dist/${id}/`)
        console.log('after', file.slice(fileFolderPath.length + 1));
      uploadFiles(`dist/${id}/` + file.slice(fileFolderPath.length + 1), file)

    })
  }

  const getAllFiles = (folderPath: string) => {
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
