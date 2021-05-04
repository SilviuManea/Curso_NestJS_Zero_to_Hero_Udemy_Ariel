import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) //we use dependency injection to make available the user for later use
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'), //this is the secret that is going to be used to verify the signature of the token extracted from the request.
    });
  }

  //this method must exist for every strategy - at the end whatever we return from here is going to be injected in the request of any operation that is guarded with authentication
  async validate(payload: JwtPayload): Promise<User> {
    //if this method is called is because the token has already been validated

    const { username } = payload; //because in the payload at this moment we only have the user
    const user = await this.userRepository.findOne({ username }); //retrieve the user from the database

    //if we cannot find the user in the database
    if (!user) {
      throw new UnauthorizedException();
    }

    return user; //we return the authorised user that will perfor whatever operation next
  }
}
