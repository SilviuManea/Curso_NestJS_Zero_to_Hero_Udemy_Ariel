import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) //we inject the repository so that we can use it in the service
    private taskRepository: TaskRepository,
  ) {}

  // //Returns all tasks
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  //My solution to challenge 4-47
  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id);
    return this.taskRepository.deleteTask(found);

    //this.tasks = this.tasks.filter((task) => task.id !== found.id); //if the function returns false, that task is filtered out of the array(we return it only for the tasks with the id we want to delete)
  }

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
