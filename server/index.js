import express, { json } from "express";
import axios from "axios";
import cors from "cors";
import dayjs from "dayjs";

const app = express();
const port = 3001;

const corsOption = {
  origin: "http://localhost:3000", // client origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.get("/repos", async (req, res) => {
  try {
    const { order = "desc" } = req.query;
    await axios
      .get("https://api.github.com/users/freeCodeCamp/repos")
      .then(({ data }) => {
        const reposData = data
          .filter((repo) => repo.fork !== true && repo.forks > 5)
          .sort((rep1, rep2) => {
            if (order == "asc") {
              return dayjs(rep1.created_at) - dayjs(rep2.created_at);
            } else {
              return dayjs(rep2.created_at) - dayjs(rep1.created_at);
            }
          });

        res.setHeader("content-type", "application/json");
        res.send(reposData);
      })
      .catch((error) => {
        throw Error(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something broke!");
  }
  // res.setHeader("content-type", "application/json");
  // res.send(mockData);
});

app.listen(port, () => {
  console.log(`Sever listening on port ${port}`);
});
