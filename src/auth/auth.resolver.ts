import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './entities/auth.entity';
import { LoginInput } from './dto/login-data.input';
import { RegisterInput } from './dto/register-data.input';

@Resolver(() => LoginResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => RegisterResponse)
  async register(
    @Args('data') data: RegisterInput
  ) {
    try {
      const registerResponse: RegisterResponse = await this.authService.register(data);
      return registerResponse;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => LoginResponse)
  async signIn(
    @Args('data') data: LoginInput
  ) {
    try {
      const loginResponse: LoginResponse = await this.authService.signIn(data);
      return loginResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


