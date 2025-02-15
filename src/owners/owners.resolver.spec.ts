import { Test, TestingModule } from '@nestjs/testing';
import { OwnersResolver } from './owners.resolver';
import { OwnersService } from './owners.service';
import { Owner } from './owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Pet } from 'src/pets/pet.entity';

describe('OwnersResolver', () => {
  let resolver: OwnersResolver;
  let service: OwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersResolver, OwnersService],
    }).compile();

    resolver = module.get<OwnersResolver>(OwnersResolver);
    service = module.get<OwnersService>(OwnersService);
  });

  it('should create a new owner', async () => {
    const createOwnerInput: CreateOwnerInput = { name: 'Gabriel Brelaz' };
    const owner: Owner = await resolver.createOwner(createOwnerInput);
    expect(owner).toBeDefined();
    expect(owner.name).toBe(createOwnerInput.name);
  });

  it('should retrieve all owners', async () => {
    const owners: Owner[] = await resolver.findAll();
    expect(owners).toBeDefined();
    expect(owners.length).toBeGreaterThan(0);
  });

  it('should retrieve an owner by id', async () => {
    const id: number = 1;
    const owner: Owner = await resolver.findOne(id);
    expect(owner).toBeDefined();
    expect(owner.id).toBe(id);
  });

  it('should update an owner', async () => {
    const id: number = 1;
    const updateOwnerInput: UpdateOwnerInput = { id, name: 'Gabriel' };
    const owner: Owner = await resolver.updateOwner(updateOwnerInput);
    expect(owner).toBeDefined();
    expect(owner.name).toBe(updateOwnerInput.name);
  });

  it('should retrieve pets for an owner', async () => {
    const ownerId: number = 1;
    const owner: Owner = await resolver.findOne(ownerId);
    const pets: Pet[] = await resolver.pets(owner);
    expect(pets).toBeDefined();
    expect(pets.length).toBeGreaterThan(0);
  });

  it('should remove an owner', async () => {
    const id: number = 1;
    await resolver.removeOwner(id);
    const owner: Owner = await resolver.findOne(id);
    expect(owner).toBeNull();
  });

});