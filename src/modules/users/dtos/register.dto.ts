import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export default class RegisterDto {
  constructor(
    full_name: string,
    email: string,
    password: string,
    referral_code: string
  ) {
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.referral_code = referral_code;
  }

  @IsNotEmpty()
  public full_name: string;
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @MinLength(6, {
    message: "Too short, minimum length is 6 character",
  })
  @MaxLength(16, {
    message: "Too long, maximum length is 16 character",
  })
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@$%^&:)({}[;<>?,.@#\]]).{6,16}$/,
    {
      message:
        "Password must be from 6 to 16 character and include 1 uppercase letter and 1 special character",
    }
  )
  public password: string;
  public referral_code: string;
}
