import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

// Repository pattern - can manage entities in an encapsulated manner.
// We can still perform same operations we would normally perform on the entity class directly but we can also add custom logic.
// We end up removing from our service which results in shorter methods in our service and easyer code to understand
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    //separate filters
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task'); // keyword that we are going to use to refer to the task entity

    query.where('task.userId= :userId', { userId: user.id }); //where the userID is the same as the one that is coming via parameter

    //if status provided by user
    if (status) {
      query.andWhere('task.status = :status', { status }); // by using andWhere we are supporting both filtering by status and search. Using only where will only allow us to filter by one parameter.
    }
    //if search provided by user
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)', //acts as one single condition
        { search: `%${search}%` },
      ); //`%${search}%` allows seaching for partial matches or parts of the search term word
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.username}", Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    //Extract only the keys we need from the dto
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user; //we asign the task to the user that is creating it

    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to create task for user "${user.username}". Data:${createTaskDto}`, error.stack);
      throw new InternalServerErrorException();
    }

    delete task.user; //delete the user property before returning it(it has already been saved)for security reasons
    return task;
  }

  //My solution to challenge 4-47
  async deleteTask(task: Task): Promise<void> {
    await task.remove();
  }
}
