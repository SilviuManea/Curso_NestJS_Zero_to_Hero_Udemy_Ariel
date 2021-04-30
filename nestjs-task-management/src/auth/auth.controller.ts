import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, //we inject the service via DI in order to access the signup function.
  ) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    //console.log(authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}
