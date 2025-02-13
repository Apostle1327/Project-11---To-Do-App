// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import "./ToDo.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ToDo = () => {
  let taskZero = [];
  try {
    taskZero = JSON.parse(localStorage.getItem("task")) || [];
  } catch (e) {
    console.error("You Good Bro?, Check your Input", e);
  }

  const [tasks, setTasks] = useState(taskZero);
  const [task, setTask] = useState("");

  const executeTask = () => {
    if (task.trim() !== "") {
      const modifiedTasks = [...tasks, { text: task, executed: false }];
      setTasks(modifiedTasks);
      localStorage.setItem("task", JSON.stringify(modifiedTasks));
      setTask("");
    }
  };

  const purgeTask = (key) => {
    const modifiedTasks = tasks.filter((_, i) => i !== key);
    setTasks(modifiedTasks);
    localStorage.setItem("task", JSON.stringify(modifiedTasks));
  };

  const concludeTask = (key) => {
    const modifiedTasks = tasks.map((task, ind) => {
      return ind === key ? { ...task, executed: !task.executed } : task;
    });
    setTasks(modifiedTasks);
    localStorage.setItem("task", JSON.stringify(modifiedTasks));
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-4">Get Shit Done!</h1>

        <div className="form-floating mt-2 d-flex align-items-center justify-content-center">
          <input
            type="text"
            className="form-control w-75"
            id="floatingInput"
            placeholder="Enter The Task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />

          <label htmlFor="floatingInput" id="inputLabel">
            Enter Task
          </label>

          <button
            type="button"
            className="btn btn-primary ms-4"
            onClick={executeTask}
          >
            Add Task
          </button>
        </div>

        <ul className="list-group d-flex flex-column justify-content-center align-items-center">
          {tasks.map((task, ind) => (
            <li
              key={ind}
              className={`list-group-item border rounded-3 d-flex justify-content-between align-items-center mt-5 w-50 ${
                task.executed ? "text-success" : "text-danger"
              }`}
            >
              {task.text}

              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => concludeTask(ind)}
                >
                  Finished
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => purgeTask(ind)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
