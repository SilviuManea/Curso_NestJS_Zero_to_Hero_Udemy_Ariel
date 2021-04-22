import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    //Injecting the UserRepository using dependency Injection
    @InjectRepository(UserRepository) //when the service is initialised we are going to inject UserRepository instance into
    private userRepository: UserRepository, //this userRepository parameter as an argument, making it accessible with this.userRepository.whatever in the entire class
  ) {}
}
