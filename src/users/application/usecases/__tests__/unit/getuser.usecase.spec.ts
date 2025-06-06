import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { GetuserUsecase } from '../../getuser.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';

describe('GetuserUsecase unit test', () => {
  let sut: GetuserUsecase.Usecase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new GetuserUsecase.Usecase(repository);
  });

  it('should throws an error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fake' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await sut.execute({ id: items[0].id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: items[0].id,
      name: items[0].name,
      email: items[0].email,
      password: items[0].password,
      createdAt: items[0].createdAt,
    });
  });
});
