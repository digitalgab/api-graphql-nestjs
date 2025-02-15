import { Injectable } from '@nestjs/common'
import { Pet } from './pet.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePet } from './dto/create-pet.input';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    ) {}

    async create(pet: CreatePet): Promise<Pet> {
        const newPet = this.petsRepository.create(pet);
        return this.petsRepository.save(newPet);
    }
    
    findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }
}
