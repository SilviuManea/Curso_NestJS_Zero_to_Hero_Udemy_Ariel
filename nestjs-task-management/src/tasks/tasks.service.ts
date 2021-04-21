import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';

import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // //Returns all tasks
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // //Returns only the task with a specific id, if the id matches
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }
  // //Create a new task and assigns a unique id
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   //Extract only the keys we need from the dto
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // // Delete a task by its ID - My solution
  // // deleteTaskById(id: string) {
  // //   let indice = 0;
  // //   const id_to_delete = this.tasks.find((element, index) => {
  // //     indice = index;
  // //     return element.id === id;
  // //   });
  // //   console.log(id_to_delete);
  // //   console.log(indice);
  // //   this.tasks.splice(indice, 1);
  // //   return 'Id of deleted element was' + id_to_delete.id;
  // // }
  // //Delete a task by its ID - Tutorial's solution
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id); //if the function returns false, that task is filtered out of the array(we return it only for the tasks with the id we want to delete)
  // }
  // //Update Tasks Status
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   //atack endpoint passing some filters http://localhost:3000/tasks?status=OPEN&search=NestJS
  //   const { status, search } = filterDto; //dto destruct -> equals const status = filterDto.status; , same with search.
  //   //get all tasks
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     //filter by status
  //     tasks = tasks.filter((task) => task.status === status); //if it has the same status it will be included in to the array
  //   }
  //   if (search) {
  //     //filter by search
  //     tasks = tasks.filter(
  //       //adds to the result only those objects that match the conditions
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks; //return array of matching objects.
  // }
}
