import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutputDto } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace SignupUsecase {
  export type Input = {
    name: string;
    email: string;
    password: string;
  };

  export class Usecase implements DefaultUseCase<Input, UserOutputDto> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<UserOutputDto> {
      const { name, email, password } = input;
      if (!name || !email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      await this.userRepository.emailExists(email);

      const hashPassword = await this.hashProvider.generateHash(password);

      const entity = new UserEntity(
        Object.assign(input, { password: hashPassword }),
      );
      await this.userRepository.insert(entity);

      return entity.toJSON();
    }
  }
}
