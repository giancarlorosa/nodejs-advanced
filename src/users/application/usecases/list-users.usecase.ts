import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { SearchInputDto } from '@/shared/application/dto/search-input';

export namespace ListUsersUsecase {
  export type Input = SearchInputDto;
  export type Output = void;

  export class Usecase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);
    }
  }
}
