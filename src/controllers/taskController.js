import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res, next) {
  try{
    const { id } = req.params;

    const taskId = Number(id);
    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "Validation failed",
        details: ["ID must be a number"],
      });
    }

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    return res.json(task);
  } catch (error) {
    if (error.code == 'P2023') {
      return res.status(400).json({
        error: "Validation failed",
        details: ["ID must be an integer"],
      });
    }
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
      message: "Something went wrong",
    });
  }
}