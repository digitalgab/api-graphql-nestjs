import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { CreatePet } from './dto/create-pet.input';

@Resolver(of => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(returns => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation(returns => Pet)
  create(@Args('pet') pet: CreatePet): Promise<Pet> {
    return this.petsService.create(pet);
  }
}

