import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Pet } from './pet.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Repository } from 'typeorm'
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/owner.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) 
        private petsRepository: Repository<Pet>,
        @Inject(forwardRef(() => OwnersService))
        private ownersService: OwnersService
        
    ) {}

    async create(createPetInput: CreatePetInput): Promise<Pet> {
        const pet = this.petsRepository.create(createPetInput);
        return await this.petsRepository.save(pet);
    }
    
    findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({ where: { id } });
    }

    find(options?: FindManyOptions<Pet>): Promise<Pet[]> {
        return this.petsRepository.find(options);
    }

    async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
        await this.petsRepository.update(id, updatePetInput)
        return await this.petsRepository.findOneOrFail({ where: { id } });
    }

    remove(id: number) {
        return this.petsRepository.delete(id)
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownersService.findOne(ownerId);
    }

}
