import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/module/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'DB_MYSQL',
      host: 'localhost',
      port: 3306,
      database: 'mydb',
      username: 'soerjo',
      password: 'soerjo1234',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class DbmysqlModule {}
