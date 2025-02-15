import { Test, TestingModule } from '@nestjs/testing';
import { OwnersResolver } from './owners.resolver';
import { OwnersService } from './owners.service';
import { Pet } from '../pets/pet.entity';
import { Owner } from './owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';

describe('OwnersResolver', () => {
  let owersResolver: OwnersResolver;
  let ownersService: OwnersService;
  let ownerMock: Owner;
  let petMock: Pet;

  beforeEach(async () => {
    petMock = { id: 1, name: 'Moana', type: 'Cat', ownerId: 1, owner: null as any };
    ownerMock = { id: 1, name: 'Gabriel Brelaz', pets: [petMock] };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnersResolver,
        {
          provide: OwnersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([ownerMock]),
            findOne: jest.fn().mockResolvedValue(ownerMock),
            create: jest.fn().mockResolvedValue(ownerMock),
            getPets: jest.fn().mockResolvedValue([petMock]),
            update: jest.fn().mockResolvedValue(ownerMock),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    owersResolver = module.get<OwnersResolver>(OwnersResolver);
    ownersService = module.get<OwnersService>(OwnersService);
  });

  it('should create a new owner', async () => {
    const createOwnerInput: CreateOwnerInput = { name: 'Gabriel Brelaz' };
    const owner: Owner = await owersResolver.createOwner(createOwnerInput);
    expect(owner).toBeDefined();
    expect(owner.name).toBe(createOwnerInput.name);
  });

  it('should retrieve all owners', async () => {
    const owners: Owner[] = await owersResolver.findAll();
    expect(owners).toEqual([ownerMock]);
  });

  it('should retrieve an owner by id', async () => {
    const id: number = 1;
    const owner: Owner = await owersResolver.findOne(id);
    expect(owner).toEqual(ownerMock);
  });

  it('should update an owner', async () => {
    const id: number = 1;
    const updateOwnerInput: UpdateOwnerInput = { id, name: 'Gabriel Brelaz' };
    const owner: Owner = await owersResolver.updateOwner(updateOwnerInput);
    expect(owner).toEqual(ownerMock);
  });

  it('should retrieve pets for an owner', async () => {
    const pets: Pet[] = await owersResolver.pets(ownerMock);
    expect(pets).toEqual([petMock]);
  });

  it('should remove an owner', async () => {
    const ownerId = 1;
    await expect(owersResolver.removeOwner(ownerId)).resolves.toBeDefined();
    expect(ownersService.remove).toHaveBeenCalledWith(ownerId);
  });
});