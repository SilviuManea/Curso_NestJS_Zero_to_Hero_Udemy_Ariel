import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, //we inject the service via DI in order to access the signup function.
  ) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //console.log(authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }
}
