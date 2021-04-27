import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

//here is where we will write the heavy user related logic, so that we will not need to do it in the service.
@EntityRepository(User) //WE NEED TO PASS THE ENTITY THAT is going to be working with the repo
export class UserRepository extends Repository<User> {
  //repo logic - this is interacting with the user table in the database
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //we don't return anything

    //the dto comes from the controller (previous validation) to the service and finally to this repository
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
