import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return {
        id: Date.toString(),
        username: dto.username,
        email: dto.email,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        status: 200,
        message: 'success',
        data: {
          email: dto.email,
          username: dto.username,
        },
      };
    }),
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
    const createDto: CreateUserDto = {
      username: 'soerjo',
      email: 'ryo@gmail.com',
      password: 'soerjo',
    };
    expect(controller.create(createDto)).toEqual({
      id: expect.any(String),
      username: createDto.username,
      email: createDto.email,
    });
  });

  it('should update user', () => {
    const id = 'number01';
    const updateDto: UpdateUserDto = {
      email: 'yo@mail.com',
      password: 'sebuahrahasia',
      username: 'namaorang',
    };
    expect(controller.update(id, updateDto)).toEqual({
      status: expect.any(Number),
      message: expect.any(String),
      data: {
        email: updateDto.email,
        username: updateDto.username,
      },
    });
  });
});
