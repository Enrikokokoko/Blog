import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    createRole(createRoleDto: CreateRoleDto) {
        const role = this.roleRepository.create(createRoleDto);  
        return this.roleRepository.save({description: role.description, id: role.id, value: role.value})      
    }    
    
    async getRolesByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }

    async getValue() {
        const role = await this.roleRepository.find()
        return role
    }
}
