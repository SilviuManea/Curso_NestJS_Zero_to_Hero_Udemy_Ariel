//******************************************************************************************************************//
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username: 'Test user' };
//mock the taskRepository(since we dont want a connection with the database)
const mockTaskRepository = () => ({
  getTasks: jest.fn(), //we monitorize the function to be tested
}); //we return the object

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    // Create the module each test
    const module = await Test.createTestingModule({
      providers: [TasksService, { provide: TaskRepository, useFactory: mockTaskRepository }],
    }).compile();
    // Create the TasksService
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue'); // we mock a resolvedvalue
      expect(taskRepository.getTasks).not.toHaveBeenCalled(); // here the gettasks should NOT be called
      const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' }; // define filters
      const result = await tasksService.getTasks(filters, mockUser); // call gettasks
      expect(taskRepository.getTasks).toHaveBeenCalled(); // check that gettasks has been called
      expect(result).toEqual('someValue'); // check that the result of the function is the one above
    });
  });
});
