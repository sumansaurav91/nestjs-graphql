import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(createUserInput: CreateUserInput): User {
    const user = {
      id: uuidv4(),
      ...createUserInput,
    };
    this.users.push(user);
    return user;
  }
}
