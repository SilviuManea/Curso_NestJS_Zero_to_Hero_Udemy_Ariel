import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

//here is where we will write the heavy user related logic, so that we will not need to do it in the service.
@EntityRepository(User) //WE NEED TO PASS THE ENTITY THAT is going to be working with the repo
export class UserRepository extends Repository<User> {
  //repo logic - this is interacting with the user table in the database
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //we don't return anything

    //the dto comes from the controller (previous validation) to the service and finally to this repository
    const { username, password } = authCredentialsDto;

    const exists = this.findOne({ username });

    // //First method(using two queries,one for checking if the user exists and another for saving it)
    // if(exists){
    //   // ... throw some error
    // }
    // //if the user does not exist already in the db, continue creating the user.

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt(); //creating a salt like $2b$10$YH0BduVhOJqaMmpMv6gcYe
    user.password = await this.hashPassword(password, user.salt);

    //console.log(user.password);

    try {
      await user.save();
    } catch (error) {
      //console.log(error.code); //23505 -> error code for duplicate entries
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      //if the user exists and the password is valid.
      return user.username;
    } else {
      return null;
    }
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
