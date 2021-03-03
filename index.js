const express = require("express");
const http = require("http");
const axios = require("axios");

// Create Express Server
const app = express();

// Configuration
const PORT = 4300;
const HOST = "http://localhost";

app.use(async (req, res) => {
  let headers = {};
  if (req.url.includes("jpg"))
    headers = {
      //To handle images
      responseType: "arraybuffer",
    };
  await axios
    .get(req.url, headers)
    .then((response) => {
      console.log(response.status +"  "+ req.url)
      //If 304, etc
      res.status(response.status);
      if (
        req.url.includes("http://zebroid.ida.liu.se/fakenews/") &&
        !req.url.includes("jpg")
      ) {
        let newData = response.data.replace(/Stockholm(?!-)/gi, "Linkoping");
        newData = newData.replace(/smiley.jpg/gi, "trolly.jpg");
        newData = newData.replace(/Smiley/gi, "Trolly");
        res.end(newData);
      } else if (
        req.url.includes("http://zebroid.ida.liu.se/fakenews/") &&
        req.url.includes("jpg")
      ) {
        const buffer = Buffer.from(response.data, "base64");
        res.end(buffer);
      } else res.end(response.data);
    })
    .catch((error) => {
      console.log("Some error at " + req.url + "  lmao");
      res.sendStatus(404);
    });
});

http.createServer(app).listen(PORT);
console.log("Starting proxy at " + HOST + ":" + PORT);
