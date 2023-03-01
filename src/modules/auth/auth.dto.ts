import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class LoginDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @IsEmpty()
  public password: string;
}
