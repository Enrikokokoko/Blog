import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
   @IsString({message: 'Should be a string'})
   username: string;
   @IsEmail({}, {message: 'Invalid email'})
   email: string;
   @IsString({message: 'Should be a string'})
   @Length( 4, 15, {message: 'No less than 4 and no more than 10'})
   password: string;
}
