import express from "express";

const app = express();

app.get("/*", (req, res) =>{
    const host = req.hostname;
    console.log('host', host);
    const id = host.split(".")[0];
    console.log('id', id);
})

app.listen(3001);
