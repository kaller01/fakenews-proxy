const express = require("express");
const http = require("http");
const axios = require("axios");
const ab2str = require("arraybuffer-to-string");

// Create Express Server
const app = express();

// Configuration
const PORT = 4300;
const HOST = "http://localhost";

app.use(async (req, res) => {
  let headers = {};
  headers = {
    //To handle images
    responseType: "arraybuffer",
  };
  await axios
    .get(req.url, headers)
    .then((response) => {
      console.log(response.status + "  " + req.url);
      //Same status as response
      res.status(response.status);
      if (
        req.url.includes("http://zebroid.ida.liu.se/fakenews/") &&
        response.headers["content-type"].includes("text")
      ) {
        res.end(addFakenews(ab2str(response.data)));
      } else res.end(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log("Some error at " + req.url + "  lmao");
      res.sendStatus(404);
    });
});

//Adds fakenews
function addFakenews(data) {
  data = data.replace(/Stockholm(?!-)/gi, "Linkoping");
  data = data.replace(/smiley.jpg/gi, "trolly.jpg");
  data = data.replace(/Smiley/gi, "Trolly");
  return data;
}

http.createServer(app).listen(PORT);
console.log("Starting proxy at " + HOST + ":" + PORT);
