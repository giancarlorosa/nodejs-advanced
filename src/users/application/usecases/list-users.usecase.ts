import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { SearchInputDto } from '@/shared/application/dto/search-input';
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '@/shared/application/dto/pagination-output';
import { UserOutputDto, UserOutputMapper } from '../dto/user-output';

export namespace ListUsersUsecase {
  export type Input = SearchInputDto;
  export type Output = PaginationOutputDto<UserOutputDto>;

  export class Usecase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new UserRepository.SearchParams(input);
      const searchResult = await this.userRepository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: UserRepository.SearchResult): Output {
      const items = searchResult.items.map(item => {
        return UserOutputMapper.toOutput(item);
      });

      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }
}
