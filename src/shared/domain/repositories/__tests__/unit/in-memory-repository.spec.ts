import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory-repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}
class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let sut: StubInMemoryRepository;

  beforeEach(() => {
    sut = new StubInMemoryRepository();
  });

  it('shoud insert a new entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 50 });
    await sut.insert(entity);

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('shoud throw an error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('shoud find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test name', price: 50 });
    await sut.insert(entity);
    const result = await sut.findById(entity.id);

    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });

  it('should return all entities', async () => {
    const entity = new StubEntity({ name: 'Test name', price: 50 });
    await sut.insert(entity);
    const result = await sut.findAll();

    expect([entity]).toStrictEqual(result);
  });

  it('shoud throw an error on update when update not found', async () => {
    const entity = new StubEntity({ name: 'Test name', price: 50 });

    await expect(sut.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('shoud update an entity', async () => {
    const entity = new StubEntity({ name: 'Test name', price: 50 });
    await sut.insert(entity);
    const entityUpdated = new StubEntity(
      {
        name: 'Updated name',
        price: 10,
      },
      entity.id,
    );
    await sut.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(sut.items[0].toJSON());
  });

  it('shoud throw an error when trying to delete a non existent entity', async () => {
    await expect(sut.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('shoud update an entity', async () => {
    const entity = new StubEntity({ name: 'Test name', price: 50 });
    await sut.insert(entity);
    await sut.delete(entity.id);

    expect(sut.items).toHaveLength(0);
  });
});
