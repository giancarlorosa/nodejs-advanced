import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UpdateUserUsecase } from '../../update-user.usecase';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

describe('UpdateUserUsecase unit test', () => {
  let sut: UpdateUserUsecase.Usecase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new UpdateUserUsecase.Usecase(repository);
  });

  it('should throws an error when entity not found', async () => {
    await expect(() =>
      sut.execute({ id: 'fake', name: 'test name' }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('should throws an error when name is not provided', async () => {
    await expect(() => sut.execute({ id: 'fake', name: '' })).rejects.toThrow(
      new BadRequestError('Name not provided'),
    );
  });

  it('should be able to update an user', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await sut.execute({ id: items[0].id, name: 'new name' });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: 'new name',
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
