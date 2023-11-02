import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUsersDto) {
        return this.usersRepository.create(createUserDto);
    }
}
