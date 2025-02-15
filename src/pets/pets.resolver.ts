import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(of => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query(returns => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }
   
  @Query(returns => Pet)
  pet(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Mutation(returns => Pet)
  create(@Args('pet') pet: CreatePetInput): Promise<Pet> {
    return this.petsService.create(pet);
  }
}

