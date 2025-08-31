import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { UserDocument } from './models/users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userRepository.create({ ...createUserDto });
  }
}
