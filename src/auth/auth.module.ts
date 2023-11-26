import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [AuthResolver, AuthService,UserService],
})
export class AuthModule {}
