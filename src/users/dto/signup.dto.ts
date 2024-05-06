/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignupDto {
    @ApiProperty({
        example: 'fethi',
        required: true
     })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'fethi.bouabidi@gmail.com',
        required: true
     })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        example: '1234578910',
        required: true
     })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;
}