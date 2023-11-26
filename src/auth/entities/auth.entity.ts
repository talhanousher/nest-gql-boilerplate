import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;
}


@ObjectType()
export class LoginResponse {
  @Field(() => Boolean)
  success?: boolean;

  @Field(() => String)
  message?: string;
  @Field(() => String)
  user_id?: string;
  @Field(() => String)
  access_token?: string;
  @Field(() => Number)
  status?: Number;
  @Field(() => String)
  id?: string;
}
