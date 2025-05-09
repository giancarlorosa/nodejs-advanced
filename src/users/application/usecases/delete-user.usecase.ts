import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';

export namespace DeleteUserUsecase {
  export type Input = {
    id: string;
  };

  export class Usecase implements DefaultUseCase<Input, void> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input) {
      await this.userRepository.delete(input.id);
    }
  }
}
