import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from './password.entity';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
  imports: [TypeOrmModule.forFeature([Password])]
})
export class PasswordModule {}
