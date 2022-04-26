import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from '../../common/dto/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { compareSync } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository, 'DB_MYSQL')
    private userRepo: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = await this.userRepo.createUser(createUserDto);
    return new ResponseDto(data);
  }

  async compare(login: Omit<CreateUserDto, 'username'>) {
    const data = await this.userRepo.findOne({ email: login.email });
    if (data) return compareSync(login.password, data.password);
    return false;
  }

  async findAll() {
    const data = await this.userRepo.findAll();
    return new ResponseDto(data);
  }

  async findOne(id: string) {
    const data = await this.userRepo.findOne({ id });
    return new ResponseDto(data);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: number; message: string; data: User }> {
    const data = await this.userRepo.updateUser(id, updateUserDto);
    return new ResponseDto(data);
  }

  async remove(id: string) {
    const data = await this.userRepo.removeUser(id);
    return new ResponseDto(data);
  }
}
