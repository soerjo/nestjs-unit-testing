import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

export type Moctype<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService: Moctype<UsersService> = {
    create: jest.fn((dto) => dto),
    update: jest.fn((id, dto) => dto),
    findOne: jest.fn((id: string) => ({} as User)),
    findAll: jest.fn(() => [] as User[]),
    remove: jest.fn((id: string) => true),
  };

  const id = 'number01';
  const regist: CreateUserDto = {
    email: 'yo@mail.com',
    password: 'sebuahrahasia',
    username: 'namaorang',
  };

  const update: UpdateUserDto = {
    email: 'yo@mail.com',
    password: 'sebuahrahasia',
    username: 'orang',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('endpoint users/create', () => {
    it('should create user', () => {
      controller.create(regist);
      expect(controller.create(regist)).toEqual(regist);
    });
  });

  it('should update user', () => {
    expect(controller.update(id, update)).toEqual(update);
  });

  it('should get user', () => {
    expect(controller.findAll()).toEqual(expect.arrayContaining<User>([]));
  });

  it('should delete user', () => {
    expect(controller.remove(id)).toEqual(true);
  });
});
