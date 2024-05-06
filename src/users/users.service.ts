import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { User } from './models/users.model';
import { isNil } from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}

  async exists(data: SignupDto): Promise<boolean> {
    const { email } = data;
    const user = await this.userModel.findOne({
      where: [{ email }],
    });
    return !isNil(user);
  }

  // Check if user exists
  async UserExists(userID): Promise<boolean> {
    const user = await this.userModel.findById(userID).exec();
    return user == null ? false : true;
  }
  public async siginUp(signupDto: SignupDto): Promise<User> {
    const user = new this.userModel(signupDto);
    return user.save();
  }

  public async siginIn(signInDto: SigninDto): Promise<{
    name: string;
    jwtToken: string;
    email: string;
  }> {
    const user = await this.findByEmail(signInDto.email);
    const match = await this.checkPassword(signInDto.password, user);
    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }
    const jwtToken = await this.authService.createAccessToken(user._id);
    return {
      name: user.name,
      jwtToken,
      email: user.email,
    };
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email not found');
    }
    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Password Wrong');
    }
    return match;
  }
}
