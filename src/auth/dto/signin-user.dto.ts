import { IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
