import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<UserRepository>;

  const db: User[] = [
    {
      id: 'number01',
      email: 'yo@mail.com',
      password: 'sebuahrahasia',
      username: 'namaorang',
    },
  ];

  const registDto: CreateUserDto = {
    email: 'yo@mail.com',
    password: 'sebuahrahasia',
    username: 'namaorang',
  };

  const updateDto: UpdateUserDto = {
    email: 'yo@mail.com',
    password: 'sebuahrahasia',
    username: 'orang',
  };

  const userMockFactory: MockType<UserRepository> = {
    createUser: jest.fn((dto): User => ({ ...dto, id: 'number02' })),
    findAll: jest.fn(() => db),
    updateUser: jest.fn((id, dto) => dto),
    findOne: jest.fn(
      (user: Partial<User>): User =>
        db.find((val) => Object.keys(User).map((key) => val[key] === user[key])),
    ),
    removeUser: jest.fn((id: string) => (userMockFactory.findOne({ id }) ? true : false)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserRepository, 'DB_MYSQL'),
          useValue: userMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<UserRepository>>(
      getRepositoryToken(UserRepository, 'DB_MYSQL'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be define userRepository', () => {
    expect(userRepo).toBeDefined();
  });

  it('should be create', async () => {
    expect(await service.create(registDto)).toEqual({ ...registDto, id: 'number02' });
  });
  it('should be getall', async () => {
    expect(await service.findAll()).toEqual(expect.arrayContaining<User>([]));
  });
  it('should be getOne', async () => {
    expect(await service.findOne('number01')).toEqual(db[0]);
  });
  it('should be update', async () => {
    expect(await service.update('number01', updateDto)).toEqual(updateDto);
  });
  it('should be false at compare', async () => {
    expect(await service.compare(registDto)).toEqual(false);
  });
  it('should be remove', async () => {
    expect(await service.remove('number01')).toEqual(true);
  });
});
