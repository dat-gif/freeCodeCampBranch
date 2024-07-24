import express, { json } from "express";
import axios from "axios";
const app = express();
const port = 3001;

app.get("/repos", async (req, res) => {
  const data = await axios.get(
    "https://api.github.com/users/freeCodeCamp/repos"
  );
  res.send(data.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
