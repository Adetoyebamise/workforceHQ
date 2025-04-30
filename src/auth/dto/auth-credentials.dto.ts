import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;
}

export class AuthCredentialsSignInDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  password: string;
}
