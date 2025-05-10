import { UsersController } from '../../users.controller';
import { UserOutputDto } from '@/users/application/dto/user-output';
import { SignupUsecase } from '@/users/application/usecases/signup.usecase';
import { SignupDto } from '../../dto/signup.dto';
import { SigninUsecase } from '@/users/application/usecases/signin.usecase';
import { SigninDto } from '../../dto/signin.dto';
import { UpdateUserUsecase } from '@/users/application/usecases/update-user.usecase';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UpdatePasswordUsecase } from '@/users/application/usecases/update-password.usecase';
import { UpdatePasswordDto } from '../../dto/update-password.dto';
import { GetuserUsecase } from '@/users/application/usecases/getuser.usecase';
import { ListUsersUsecase } from '@/users/application/usecases/list-users.usecase';

describe('UsersController unit test', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutputDto;

  beforeEach(() => {
    sut = new UsersController();
    id = '5ab867a8-6619-43ec-90bb-e8dd7be7e5d0';
    props = {
      id,
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create an user', async () => {
    const output: SignupUsecase.Output = props;
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['signupUseCase'] = mockSignupUseCase as any;
    const input: SignupDto = {
      name: 'Jhon Doe',
      email: 'a@a.com',
      password: '1234',
    };
    const result = await sut.create(input);

    expect(output).toMatchObject(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should authenticate an user', async () => {
    const output: SigninUsecase.Output = props;
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['signinUseCase'] = mockSigninUseCase as any;
    const input: SigninDto = {
      email: 'a@a.com',
      password: '1234',
    };
    const result = await sut.login(input);

    expect(output).toMatchObject(result);
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update an user', async () => {
    const output: UpdateUserUsecase.Output = props;
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updateUserUseCase'] = mockUpdateUseCase as any;
    const input: UpdateUserDto = {
      name: 'New name',
    };
    const result = await sut.update(id, input);

    expect(output).toMatchObject(result);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
  });

  it('should update an user password', async () => {
    const output: UpdatePasswordUsecase.Output = props;
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any;
    const input: UpdatePasswordDto = {
      password: 'new password',
      oldPassword: 'old password',
    };
    const result = await sut.updatePassword(id, input);

    expect(output).toMatchObject(result);
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });

  it('should delete an user', async () => {
    const output = undefined;
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any;

    const result = await sut.remove(id);

    expect(output).toStrictEqual(result);
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should get an user', async () => {
    const output: GetuserUsecase.Output = props;
    const mockGetUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['getUserUseCase'] = mockGetUserUseCase as any;

    const result = await sut.findOne(id);

    expect(output).toMatchObject(result);
    expect(mockGetUserUseCase.execute).toHaveBeenCalledWith({ id });
  });

  it('should list users', async () => {
    const output: ListUsersUsecase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    };
    const mockListUsersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };
    sut['listUsersUseCase'] = mockListUsersUseCase as any;
    const searchParams = {
      page: 1,
      perPage: 1,
    };
    const result = await sut.search(searchParams);

    expect(output).toStrictEqual(result);
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams);
  });
});
