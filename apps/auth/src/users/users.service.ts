import {
    Injectable,
    UnauthorizedException,
    ConflictException
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersRepository } from './users.repository';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUsersDto) {
        await this.validateCreateUserDto(createUserDto);
        return this.usersRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    }

    private async validateCreateUserDto(createUserDto: CreateUsersDto) {
        try {
            await this.usersRepository.findOne({ email: createUserDto.email });
        } catch (error) {
            return;
        }
        throw new ConflictException('Email is already in use');
    }

    async verifyUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException('Credentials are not valid');
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto) {
        return this.usersRepository.findOne(getUserDto);
    }
}
