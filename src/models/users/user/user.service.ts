import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UserRepository } from './user.repository';
import { User } from "./user.entity";
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: UserRepository
  ) {
  }

  async createUser(userDto: CreateUserDto) {
    return await this.usersRepository.save(userDto);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email: email });
  }

  async findById(id: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return await this.usersRepository.findOneBy(id);
  }
}
