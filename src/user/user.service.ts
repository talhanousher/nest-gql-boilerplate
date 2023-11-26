import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RegisterInput } from 'src/auth/dto/register-data.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';


@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  create(data: RegisterInput) {
    return this.prisma.user.create({
      data
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
