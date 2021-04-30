import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    //Injecting the UserRepository using dependency Injection
    @InjectRepository(UserRepository) //when the service is initialised we are going to inject UserRepository instance into
    private userRepository: UserRepository, //this userRepository parameter as an argument, making it accessible with this.userRepository.whatever in the entire class
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials'); //we throw this so that the atacker does not know if the user or the pwd is correcto or incorrect. We return the same message without any hint.
    }
  }
}
