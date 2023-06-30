import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        console.log(user);
        
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByUsername(userDto.username)
        if(candidate){
            throw new HttpException('User with this username already exists', HttpStatus.BAD_GATEWAY)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 8)
        const user = await this.usersService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {
            username: user.username, 
            id: user.id, 
            email: user.email, 
            roles: user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByUsername(userDto.username)
        const verifyPassword = await bcrypt.compare(userDto.password, user.password)
        if(user && verifyPassword) {
            return user
        } else {
            throw new UnauthorizedException({ message: 'Invalid username or password'})
        }
    }
}
