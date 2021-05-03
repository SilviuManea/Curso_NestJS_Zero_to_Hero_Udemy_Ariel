import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

//Custom decorator  - retrieves the user entity from db and inject it into the request object
//data provided to the decorator - none at the moment

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

//This should return something like:
/*
User {
    id: 1,
    username: 'Ariel',
    password: '$2b$10$wxdfiZsldVUyEp7OnRPvZe/wq/fJAj2JrUYwFhg2lcgHFjcpJC/Oi',
    salt: '$2b$10$wxdfiZsldVUyEp7OnRPvZe'
  }
*/
