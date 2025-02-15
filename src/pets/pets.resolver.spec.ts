import { Test, TestingModule } from '@nestjs/testing';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Pet } from './pet.entity';
import { Owner } from '../owners/owner.entity';
import { DeletePetInput } from './dto/delete-pet.input';

describe('PetsResolver', () => {
  let petsResolver: PetsResolver;
  let petsService: PetsService;
  const petMock: Pet = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1, owner: null as any };
  const ownerMock: Owner = { id: 1, name: 'Gabriel Brelaz', pets: [petMock] };

  beforeEach(async () => {
    petMock.owner = ownerMock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsResolver,
        {
          provide: PetsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([petMock]),
            findOne: jest.fn().mockResolvedValue(petMock),
            create: jest.fn().mockResolvedValue(petMock),
            update: jest.fn().mockResolvedValue(petMock),
            getOwner: jest.fn().mockResolvedValue(ownerMock),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    petsResolver = module.get<PetsResolver>(PetsResolver);
    petsService = module.get<PetsService>(PetsService);
  });

  it('should create a new pet', async () => {
    const pet: CreatePetInput = { name: 'Moana', type: 'Cat', ownerId: 1 };
    const result = await petsResolver.createPet(pet);
    expect(result).toMatchObject(pet);
  });

  it('should retrieve all pets', async () => {
    const result = await petsResolver.findAll();
    expect(result).toEqual([petMock]);
  });

  it('should retrieve a pet by id', async () => {
    const id = 1;
    const result = await petsResolver.findOne(id);
    expect(result).toEqual(petMock);
  });

  it('should update a pet', async () => {
    const pet: UpdatePetInput = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1 };
    const result = await petsResolver.updatePet(pet);
    expect(result).toMatchObject(pet);
  });

  it('should retrieve owner for a pet', async () => {
    const owner = await petsResolver.owner(petMock);
    expect(owner).toEqual(ownerMock);
  });

  it('should remove a pet', async () => {
    const pet: DeletePetInput = { id: 1 };
    await expect(petsResolver.removePet(pet)).resolves.toBeNull();
    expect(petsService.remove).toHaveBeenCalledWith(pet.id);
  });
});

