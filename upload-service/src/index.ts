import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateRandom } from "./utils";
import path from "path";
import { getAllFiles } from "./files";
import { uploadFiles } from "./aws";
import {createClient} from 'redis';

const publisher = createClient();
publisher.connect();

const app = express();
app.use(cors());
app.use(express.json());


app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.url;
  const id = generateRandom();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));


  files.forEach(async file => {
    await uploadFiles(file.slice(__dirname.length + 1), file);
  });

  publisher.lPush("new-queue", id)


  res.json({
    id: id,
  });
});

app.listen(3000);
