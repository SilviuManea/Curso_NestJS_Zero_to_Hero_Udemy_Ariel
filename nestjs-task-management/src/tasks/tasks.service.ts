import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

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

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  //Tutorial solution to challenge 4-47
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    //console.log(result);
    if (result.affected === 0) {
      //if there were no rows affected
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      //nothing - element has been deleted
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    //Retrieve the task
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
