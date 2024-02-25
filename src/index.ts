import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generateRandom } from "./utils";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

console.log('path.join(__dirname, `output/${id}`', path.join(__dirname, `output/random`));

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.url;
  const id = generateRandom();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  console.log("repoUrl", repoUrl);

  res.json({
    id: id,
  });
});

app.listen(3000);
