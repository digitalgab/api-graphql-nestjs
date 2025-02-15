import { Injectable } from '@nestjs/common'
import { Pet } from './pet.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    ) {}
    
    findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({ where: { id } });
    }

    async create(pet: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(pet);
        return this.petsRepository.save(newPet);
    }
}
