import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/users.schema';
import { UserRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUser(createUserDto);
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUser(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const IsPasswordValid = await bcrypt.compare(password, user.password);

    if (!IsPasswordValid) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }

  async getUser({ _id }: GetUserDto) {
    return this.userRepository.findOne({ _id });
  }
}
