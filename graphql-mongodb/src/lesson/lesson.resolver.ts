import { Resolver, Query } from '@nestjs/graphql';
import { LessonType } from './lesson.type';

//the resolver will handle incoming requests and then return the response
@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: 'asdasd123',
      name: 'Programming class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
