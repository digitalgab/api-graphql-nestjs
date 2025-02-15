import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
      @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}
  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
      const Owner = this.ownersRepository.create(createOwnerInput);
      return await this.ownersRepository.save(Owner);
  }

  findAll(): Promise<Owner[]> {
      return this.ownersRepository.find()
  }

  findOne(id: number): Promise<Owner> {
      return this.ownersRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput): Promise<Owner> {
      await this.ownersRepository.update(id, updateOwnerInput)
      return await this.ownersRepository.findOneOrFail({ where: { id } });
  }

  remove(id: number) {
    return this.ownersRepository.delete(id)
  }
}
