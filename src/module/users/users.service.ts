import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository, 'DB_MYSQL')
    private userRepo: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.createUser(createUserDto);
  }

  async compare(login: Omit<CreateUserDto, 'username'>) {
    const data = await this.userRepo.findOne({ email: login.email });
    return compareSync(login.password, data.password);
  }

  async findAll() {
    return await this.userRepo.findAll();
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.updateUser(id, updateUserDto);
  }

  async remove(id: string) {
    const removeUser = await this.userRepo.removeUser(id);
    if (removeUser) return true;
    return false;
  }
}
