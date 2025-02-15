import { Test, TestingModule } from '@nestjs/testing';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './pet.entity';
import { Owner } from '../owners/owner.entity';

describe('PetsResolver', () => {
  let petsResolver: PetsResolver;
  let petsService: PetsService;

  beforeEach(async () => {
    const petEntity: Pet = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1, owner: null as any };
    const ownerEntity: Owner = { id: 1, name: 'Gabriel Brelaz', pets: [petEntity] };
    petEntity.owner = ownerEntity;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsResolver,
        {
          provide: PetsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([petEntity]),
            findOne: jest.fn().mockResolvedValue(petEntity),
            create: jest.fn().mockResolvedValue(petEntity),
            update: jest.fn().mockResolvedValue(petEntity),
            getOwner: jest.fn().mockResolvedValue(ownerEntity),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    petsResolver = module.get<PetsResolver>(PetsResolver);
    petsService = module.get<PetsService>(PetsService);
  });

  it('should create a new pet', async () => {
    const input: CreatePetInput = { name: 'Moana', type: 'Cat', ownerId: 1 };
    const result: Pet = await petsResolver.createPet(input);
    expect(result).toBeDefined();
    expect(result.name).toBe(input.name);
  });

  it('should retrieve all pets', async () => {
    const result: Pet[] = await petsResolver.findAll();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should retrieve a pet by id', async () => {
    const id = 1;
    const result: Pet = await petsResolver.findOne(id);
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });

  it('should update a pet', async () => {
    const input: UpdatePetInput = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1 };
    const result: Pet = await petsResolver.updatePet(input);
    expect(result).toBeDefined();
    expect(result.name).toBe(input.name);
  });

  it('should retrieve owner for a pet', async () => {
    const pet: Pet = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1, owner: null as any };
    const owner: Owner = await petsResolver.owner(pet);
    expect(owner).toBeDefined();
    expect(owner.id).toBe(pet.ownerId);
  });

  it('should remove a pet', async () => {
    const id = 1;
    await expect(petsResolver.removePet(id)).resolves.toBeNull();
    expect(petsService.remove).toHaveBeenCalledWith(id);
  });
});
