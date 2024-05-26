import express from "express";
import { createTasks, deleteTasks, fetchTasks, updateTasks } from "./task";
import serverless from "serverless-http";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("If you see this message, the API is up and running!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items);
  } catch (e) {
    res.status(400).send(`Error fetching tasks: ${e}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await createTasks(task);
    res.send(response);
  } catch (e) {
    res.status(400).send(`Error creating tasks: ${e}`);
  }
});

app.put("/task", async (req, res) => {
  try {
    const task = req.body;
    const response = await updateTasks(task);
    res.send(response);
  } catch (e) {
    res.status(400).send(`Error updating tasks: ${e}`);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTasks(id);
    res.send(response);
  } catch (e) {
    res.status(400).send(`Error deleting tasks: ${e}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
