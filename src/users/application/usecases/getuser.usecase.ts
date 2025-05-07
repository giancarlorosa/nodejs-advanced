import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutputDto } from '../dto/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace GetuserUsecase {
  export type Input = {
    id: string;
  };

  export class Usecase implements DefaultUseCase<Input, UserOutputDto> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<UserOutputDto> {
      const entity = await this.userRepository.findById(input.id);

      return entity.toJSON();
    }
  }
}
