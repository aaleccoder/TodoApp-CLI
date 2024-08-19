import { parse } from "path";
import files from "./json"
import { Task } from "./Task";
import { Command } from "commander";

let data: Array<Task> = files.readFile();
const program = new Command();

const args = process.argv.slice(2);

if (args[0] == "list") {
  listAllTasks(args[1])
}

if (args[0] == "add") {
  addTask(args[1], args[2])
}

if(args[0] == "delete") {
  deleteTask(parseInt(args[1]))
}
if(args[0] == "mark-done") {
  markDone(parseInt(args[1]))
}
if(args[0] == "mark-in-progress") {
  markProgress(parseInt(args[1]))
}
if(args[0] == "update") {
  updateTask(parseInt(args[1]), args[2], args[3])
}
function addTask(taskName: string, taskDescription: string) {
  let todo = new Task(data.length + 1, taskName, taskDescription);
  data.push(todo)
  files.saveFile(data);
}

function deleteTask(id: number) {
  let index = data.findIndex((task: Task) => task.id === id)
  if (index !== -1){
    data.splice(index, 1);
    files.saveFile(data);
  } else [
    console.log("Not found")
  ]
}

function markDone(id: number) {
  let task: Task | undefined = data.find((task) => task.id == id)
  if(task != undefined) {
    task.isComplete = "done";
    task.updatedAt = new Date();
    files.saveFile(data);
  } else {
    console.log("Task does not exist");
  }
}

function markProgress(id: number) {
  let task: Task | undefined = data.find((task) => task.id == id)

  if(task != undefined) {
    task.isComplete = "in-progress";
    task.updatedAt = new Date();
    files.saveFile(data);
  } else {
    console.log("Task does not exist");
  }
}

function updateTask(id: number, taskName: string, taskDescription: string) {
  let task = data.find((task: Task) => task.id === id)

  if (task != undefined) {
    task.taskName = taskName;
    task.taskDescription = taskDescription
    task.updatedAt = new Date();
    files.saveFile(data);
  } else {
    console.log("Task does not exist")
  }
}

function listAllTasks(status: string) {
  console.log("All tasks:");

  if (status === "in-progress" || status === "done" || status === "todo") {
    const filtereData = data.filter((task) => task.isComplete === status)

    filtereData.forEach((element) => {
      console.log(`ID ${element.id} - | Task Name: ${element.taskName} | Task status: ${element.isComplete} | Task Description: ${element.taskDescription} |`)
    })
  } else {
    console.log("Unvalid option")
  }
}

program.parse(process.argv);
