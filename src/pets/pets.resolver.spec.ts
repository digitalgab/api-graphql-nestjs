import { Test, TestingModule } from '@nestjs/testing';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from 'src/pets/pet.entity';
import { Owner } from 'src/owners/owner.entity';
import { CreateOwnerInput } from 'src/owners/dto/create-owner.input';

describe('PetsResolver', () => {
  let resolver: PetsResolver;
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsResolver, PetsService],
    }).compile();

    resolver = module.get<PetsResolver>(PetsResolver);
    service = module.get<PetsService>(PetsService);
  });

  it('should create a new pet', async () => {
    const createPetInput: CreatePetInput = { name: 'Moana', type: 'Cat', ownerId: 1 };
    const pet: Pet = await resolver.createPet(createPetInput);
    expect(pet).toBeDefined();
    expect(pet.name).toBe(createPetInput.name);
  });

  it('should retrieve all Pets', async () => {
    const pets: Pet[] = await resolver.findAll();
    expect(pets).toBeDefined();
    expect(pets.length).toBeGreaterThan(0);
  });

  it('should retrieve an pet by id', async () => {
    const id: number = 1;
    const pet: Pet = await resolver.findOne(id);
    expect(pet).toBeDefined();
    expect(pet.id).toBe(id);
  });

  it('should update an pet', async () => {
    const id: number = 1;
    const updatePetInput: UpdatePetInput = { id, name: "Sunny", type: "Dog", ownerId: 1 };
    const pet: Pet = await resolver.updatePet(updatePetInput);
    expect(pet).toBeDefined();
    expect(pet.name).toBe(UpdatePetInput.name);
  });

  it('should retrieve owner for an pet', async () => {
    const id: number = 1;
    const pet: Pet = await resolver.findOne(id);
    const owner: Owner = await resolver.owner(pet);
    expect(owner).toBeDefined();
    expect(pet.ownerId).toBe(owner.id);
  });

  it('should remove an pet', async () => {
    const id: number = 1;
    await resolver.removePet(id);
    const pet: Pet = await resolver.findOne(id);
    expect(pet).toBeNull();
  });

});