import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { DbmysqlModule } from './provider/dbmysql/dbmysql/dbmysql.module';

@Module({
  imports: [UsersModule, DbmysqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
