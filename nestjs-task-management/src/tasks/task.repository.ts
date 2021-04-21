import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

// Repository pattern - can manage entities in an encapsulated manner.
// We can still perform same operations we would normally perform on the entity class directly but we can also add custom logic.
// We end up removing from our service which results in shorter methods in our service and easyer code to understand
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
