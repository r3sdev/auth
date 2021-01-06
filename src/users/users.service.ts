import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../exception/user-not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return new User(user);
    }
    throw new UserNotFoundException();
  }

  async findOneById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return new User(user);
    }
    throw new UserNotFoundException();
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    
    await this.usersRepository.save(newUser);

    return newUser;
  }
}
