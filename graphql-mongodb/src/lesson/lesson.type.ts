import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Lesson') // our object type is going to be Lesson instead of LessonType if we provide this in the argument
export class LessonType {
  //need to define the class properties to be filled for our lesson
  @Field((type) => ID) //we only need to specify the special type ID of graphql, in the other fields the type is inferred
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string; //its string and not date because we are going to represent the date as ISO strings

  @Field()
  endDate: string;
}

//we have an object type named lesson with four fields, three of them strings and the id field is of type ID
