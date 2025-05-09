import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { DeleteUserUsecase } from '../../delete-user.usecase';

describe('DeleteUserUsecase unit test', () => {
  let sut: DeleteUserUsecase.Usecase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new DeleteUserUsecase.Usecase(repository);
  });

  it('should throws an error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fake' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should be able to delete an user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    expect(repository.items).toHaveLength(1);

    await sut.execute({ id: items[0].id });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  });
});
