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

  // Delete a task by its ID - My solution
  // deleteTaskById(id: string) {
  //   let indice = 0;
  //   const id_to_delete = this.tasks.find((element, index) => {
  //     indice = index;
  //     return element.id === id;
  //   });

  //   console.log(id_to_delete);
  //   console.log(indice);

  //   this.tasks.splice(indice, 1);

  //   return 'Id of deleted element was' + id_to_delete.id;
  // }

  //Delete a task by its ID - Tutorial's solution
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id); //if the function returns false, that task is filtered out of the array(we return it only for the tasks with the id we want to delete)
  }
  //Update Tasks Status
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
