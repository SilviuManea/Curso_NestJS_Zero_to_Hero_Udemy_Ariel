import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  //Tasks array - fake BBDD
  private tasks: Task[] = [];

  //Returns all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  //Returns only the task with a specific id, if the id matches
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  //Create a new task and assigns a unique id
  createTask(createTaskDto: CreateTaskDto): Task {
    //Extract only the keys we need from the dto
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
