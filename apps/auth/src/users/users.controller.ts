import { Controller, Post, Body } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    async createUser(@Body() createUserDto: CreateUsersDto) {
        return this.usersService.create(createUserDto);
    }
}
