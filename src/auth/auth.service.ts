import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterInput } from './dto/register-data.input';
import { LoginResponse } from './entities/auth.entity';
import { LoginInput } from './dto/login-data.input';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) { }

  private readonly JWT_SECRET_KEY = 'your-secret-key';

  async register(data: RegisterInput) {
    try {
      const user = await this.userService.getUserByEmail(data.email);
      if (user) {
        throw new Error("Email Already Exists");
      }
      data.password = await bcrypt.hash(data.password, 10)
      return this.userService.create(data);
    } catch (error) {
      throw error;
    }
  }


  async signIn(data: LoginInput): Promise<LoginResponse> {
    try {
      const user = await this.userService.getUserByEmail(data.email);;
      if (!user) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }
      // Generate JWT token
      const token = jwt.sign(user, this.JWT_SECRET_KEY, { expiresIn: '1h' });

      return { success: true, message: "Login successful", user_id: user.id, access_token: token, status: 200 };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
