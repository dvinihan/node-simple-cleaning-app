const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(
  express.json(),
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

client.connect();
process.on("exit", client.close);

app.get("/rooms", async (req, res) => {
  try {
    const data = await client
      .db("simple-cleaning-app")
      .collection("rooms")
      .find()
      .toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .find()
      .toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/saveTask", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .updateOne({ id }, { $set: req.body }, { upsert: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
