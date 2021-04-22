import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

//here is where we will write the heavy user related logic, so that we will not need to do it in the service.
@EntityRepository(User) //WE NEED TO PASS THE ENTITY THAT is going to be working with the repo
export class UserRepository extends Repository<User> {
  //repo logic
}
