import { Injectable } from '@nestjs/common'
import { Pet } from './pet.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    ) {}
    findAll(): Promise<Pet[]> {
        return this.petsRepository.find()
    }
}
