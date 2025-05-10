import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { BcryptjsHashProvider } from './providers/hash-provider/bcrypt-hash.provider';
import { SignupUsecase } from '../application/usecases/signup.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { SigninUsecase } from '../application/usecases/signin.usecase';
import { GetuserUsecase } from '../application/usecases/getuser.usecase';
import { UpdateUserUsecase } from '../application/usecases/update-user.usecase';
import { UpdatePasswordUsecase } from '../application/usecases/update-password.usecase';
import { DeleteUserUsecase } from '../application/usecases/delete-user.usecase';
import { ListUsersUsecase } from '../application/usecases/list-users.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },
    {
      provide: SignupUsecase.Usecase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SignupUsecase.Usecase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: SigninUsecase.Usecase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new SigninUsecase.Usecase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: GetuserUsecase.Usecase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new GetuserUsecase.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: ListUsersUsecase.Usecase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new ListUsersUsecase.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdateUserUsecase.Usecase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new UpdateUserUsecase.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UpdatePasswordUsecase.Usecase,
      useFactory: (
        userRepository: UserRepository.Repository,
        hashProvider: HashProvider,
      ) => {
        return new UpdatePasswordUsecase.Usecase(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: DeleteUserUsecase.Usecase,
      useFactory: (userRepository: UserRepository.Repository) => {
        return new DeleteUserUsecase.Usecase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
