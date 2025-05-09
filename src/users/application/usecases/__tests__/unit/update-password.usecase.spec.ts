import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UpdatePasswordUsecase } from '../../update-password.usecase';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BcryptjsHashProvider } from '@/users/infrastructure/providers/hash-provider/bcrypt-hash.provider';
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';

describe('UpdatePasswordUsecase unit test', () => {
  let sut: UpdatePasswordUsecase.Usecase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    hashProvider = new BcryptjsHashProvider();
    sut = new UpdatePasswordUsecase.Usecase(repository, hashProvider);
  });

  it('should throws an error when entity not found', async () => {
    await expect(() =>
      sut.execute({
        id: 'fake',
        password: 'test password',
        oldPassword: 'test old password',
      }),
    ).rejects.toThrow(new NotFoundError('Entity not found'));
  });

  it('should throws an error when oldPassword is not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    repository.items = [entity];

    await expect(() =>
      sut.execute({
        id: entity.id,
        password: 'test password',
        oldPassword: '',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password are required'),
    );
  });

  it('should throws an error when password is not provided', async () => {
    const entity = new UserEntity(UserDataBuilder({ password: '1234' }));
    repository.items = [entity];

    await expect(() =>
      sut.execute({
        id: entity.id,
        password: '',
        oldPassword: '1234',
      }),
    ).rejects.toThrow(
      new InvalidPasswordError('Old password and new password are required'),
    );
  });

  it('should throws an error when password does not match', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(UserDataBuilder({ password: hashPassword }));
    repository.items = [entity];

    await expect(() =>
      sut.execute({
        id: entity.id,
        password: 'password test',
        oldPassword: '123456',
      }),
    ).rejects.toThrow(new InvalidPasswordError('Old password does not match'));
  });

  it('should be able to update the password', async () => {
    const hashPassword = await hashProvider.generateHash('1234');
    const spyUpdate = jest.spyOn(repository, 'update');
    const items = [new UserEntity(UserDataBuilder({ password: hashPassword }))];
    repository.items = items;

    const result = await sut.execute({
      id: items[0].id,
      password: '4567',
      oldPassword: '1234',
    });
    const checkNewPassword = await hashProvider.compareHash(
      '4567',
      result.password,
    );

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(checkNewPassword).toBeTruthy();
  });
});
