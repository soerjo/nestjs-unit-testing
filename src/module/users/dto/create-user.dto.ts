import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  @Transform((val) => val.value.toString().toLowerCase())
  username: string;

  @IsString()
  @IsNotEmpty()
  @Transform((val) => val.value.toString().toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
