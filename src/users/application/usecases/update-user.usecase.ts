import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutputDto, UserOutputMapper } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

export namespace UpdateUserUsecase {
  export type Input = {
    id: string;
    name: string;
  };

  export type Output = UserOutputDto;

  export class Usecase implements DefaultUseCase<Input, UserOutputDto> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<UserOutputDto> {
      if (!input.name) {
        throw new BadRequestError('Name not provided');
      }

      const entity = await this.userRepository.findById(input.id);
      entity.update(input.name);

      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }
  }
}
