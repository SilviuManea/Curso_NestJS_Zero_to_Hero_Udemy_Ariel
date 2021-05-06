import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [GraphQLModule.forRoot({}), LessonModule],
})
export class AppModule {}
