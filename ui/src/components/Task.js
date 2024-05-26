import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm";
import classnames from "classnames";
import { Button, Checkbox } from "@mui/material";
import axios from "axios";
import { API_URL } from "../utils";

function Task({ task, fetchTasks }) {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);
      await fetchTasks();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="task">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={updateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm fetchTasks={fetchTasks} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} task={task} />
    </div>
  );
}

export default Task;
