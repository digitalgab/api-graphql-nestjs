import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Owner } from '../owners/owner.entity';

@Resolver(() => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
    return this.petsService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'pets' })
  findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }
   
  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', {type: () => Int}) id: number): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Mutation(() => Pet)
  updatePet(@Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return this.petsService.update(updatePetInput.id, updatePetInput);
  }

  @Mutation(() => Pet)
  removePet(@Args('id', { type: () => Int }) id: number) {
    return this.petsService.remove(id);
  }

  @ResolveField(() => Owner)
  owner(@Parent () pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }

}

