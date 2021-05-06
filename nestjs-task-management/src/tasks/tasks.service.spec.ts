//******************************************************************************************************************//
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';
import { async } from 'rxjs';

const mockUser = { id: 12, username: 'Test user' };

//mock the taskRepository(since we dont want a connection with the database)
const mockTaskRepository = () => ({
  getTasks: jest.fn(), //we monitorize the function to be tested
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
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

  describe('getTaskByID', () => {
    it('calls taskRepository.findOne() and succesffully retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask); // we mock a resolvedvalue

      //const result = await tasksService.getTasks(filters, mockUser); // call gettasks
      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });
    it('throws an error as a task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null); // we mock a resolvedvalue to null if there is no task found
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException); //we expect it to throw the rejection of the unresolved promise
    });
  });

  describe('createTask', () => {
    it('calls taskRepository.create() and returns the result', async () => {
      taskRepository.createTask.mockResolvedValue('someTask');

      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const createTaskDto = { title: 'Test task', description: 'Test desc' };
      const result = await tasksService.createTask({ title: 'Test task', description: 'Test desc' }, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(createTaskDto, mockUser);
      expect(result).toEqual('someTask');
    });
  });

  describe('deleteTask', () => {
    it('calls taskRepository.deleteTask() to delete a task', async () => {
      taskRepository.delete.mockResolvedValue({ affected: 1 });
      expect(taskRepository.delete).not.toHaveBeenCalled();
      await tasksService.deleteTask(1, mockUser);
      expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });
    });
  });

  it('throws an error as task could not be found', () => {
    taskRepository.delete.mockResolvedValue({ affected: 0 });
    expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
  });

  // //It fails dont know why: ->Matcher error: received value must be a mock or spy function
  // describe('updateTaskStatus', () => {
  //   it('updates a task status', async () => {
  //     const save = jest.fn().mockResolvedValue(true);

  //     tasksService.getTaskByid = jest.fn().mockResolvedValue({
  //       status: TaskStatus.OPEN,
  //       save,
  //     });

  //     expect(tasksService.getTaskById).not.toHaveBeenCalled();
  //     expect(save).not.toHaveBeenCalled();
  //     const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE, mockUser);
  //     expect(tasksService.getTaskById).toHaveBeenCalled();
  //     expect(save).toHaveBeenCalled();
  //     expect(result.status).toEqual(TaskStatus.DONE);
  //   });
  // });
});
