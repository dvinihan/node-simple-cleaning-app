const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);

const mongodbUri = `mongodb+srv://danielvinihan:${process.env.MONGODB_PASSWORD}@cluster0.0vbpuev.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/rooms", (req, res) => {
  client.connect((err) => {
    client
      .db("simple-cleaning-app")
      .collection("rooms")
      .find()
      .toArray()
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        throw err;
        // throw new Error("There was a problem connecting to the Rooms database");
      })
      .finally(() => {
        client.close();
        console.log("client has closed");
      });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
