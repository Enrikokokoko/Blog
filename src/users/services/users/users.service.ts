import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/services/roles.service';
import { AddRoleDto } from 'src/users/dtos/AddRole.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        private rolesService: RolesService,
    ) {}

    async findUsers() {
        return this.userRepository.find({ relations: ['posts', 'roles']})
    }


    async addRole(addRoleDto: AddRoleDto) {
      const user = await this.userRepository.findOne({where: { id: addRoleDto.userId }})
      const role = await this.rolesService.getRolesByValue(addRoleDto.value)
      if(role && user) {
          user.roles = [role]
          await this.userRepository.save(user)
          return addRoleDto
      }
      throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND)
    }

    getUsersById(id: number) {
        return this.userRepository.findOneBy({id})
    }
    
    async createUser(userDetails: CreateUserDto) {
        const role = await this.rolesService.getRolesByValue('ADMIN')
        const newUser = this.userRepository.create({
            ...userDetails,
            registrationDate: new Date(),
            roles: [],
          });
          const savedUser = await this.userRepository.save(newUser);
          
          newUser.roles.push(role)

          
          await this.roleRepository.save(role)
          return this.userRepository.save(savedUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserDto) {
        return this.userRepository.update({id}, { ...updateUserDetails})
    }

    async deleteUserById(id: number) {
        const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.posts', 'post')
        .where('user.id = :id', { id })
        .getOne();
        console.log(user);
        
        
        if (user) {
          await this.postRepository.delete({ author: user });
          await this.userRepository.delete(id)
          console.log('User and related records were successfully deleted');
        } else {
          console.log('User was not found');
        } 
      }
    
    async getUserByUsername(username: string){
      const user = await this.userRepository.findOne({where: {username}, relations: ['posts', 'roles']})
      return user
    }
}


