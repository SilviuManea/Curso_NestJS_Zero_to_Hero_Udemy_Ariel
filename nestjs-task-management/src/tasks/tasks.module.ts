import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]), //this makes the typeorm module which comes from nestjs to include this taskrepository instance injectable in dependency injection throughout this module. Now we are ready to consume this module, in the service.
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
