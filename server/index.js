import express, { json } from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 3001;

const corsOption = {
  origin: "http://localhost:3000", // client origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.get("/repos", async (req, res) => {
  try {
    const data = await axios
      .get("https://api.github.com/users/freeCodeCamp/repos")
      .catch((error) => {
        console.log("error", error);
        throw Error(error);
      });
    res.send(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
