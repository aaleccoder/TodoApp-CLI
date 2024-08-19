export class Task {
  id: number;
  taskName: String;
  taskDescription: String;
  createdAt: Date;
  updatedAt: Date | null;
  isComplete: String = "todo";

  constructor(id: number, taskName: String, taskDescription: String) {
    this.id = id;
    this.taskName = taskName;
    this.taskDescription = taskDescription;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}
