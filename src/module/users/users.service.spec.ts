import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

describe('UsersService', () => {
  let service: UsersService;
  const userMockFactory: MockType<UserRepository> = {
    createUser: jest.fn((dto) => dto),
    checkDuplicate: jest.fn(),
    findAll: jest.fn(),
    updateUser: jest.fn(),
    removeUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User, 'DB_MYSQL'),
          useValue: userMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser', async () => {
    const createUserDto: CreateUserDto = {
      email: 'email@mail.com',
      username: 'user',
      password: 'password',
    };
    expect(await service.create(createUserDto)).toEqual({
      data: createUserDto,
      message: expect.any(String),
      status: expect.any(Number),
    });
  });
});
