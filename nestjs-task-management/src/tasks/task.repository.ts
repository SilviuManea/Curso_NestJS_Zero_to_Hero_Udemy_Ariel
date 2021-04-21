import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

// Repository pattern - can manage entities in an encapsulated manner.
// We can still perform same operations we would normally perform on the entity class directly but we can also add custom logic.
// We end up removing from our service which results in shorter methods in our service and easyer code to understand
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    //Extract only the keys we need from the dto
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}
