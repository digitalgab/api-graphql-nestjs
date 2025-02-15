import { Injectable } from '@nestjs/common'
import { Pet } from './pet.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) private petsRepository: Repository<Pet>,
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

    async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
        await this.petsRepository.update(id, updatePetInput)
        return await this.petsRepository.findOneOrFail({ where: { id } });
    }

    remove(id: number) {
        return this.petsRepository.delete(id)
    }

}
