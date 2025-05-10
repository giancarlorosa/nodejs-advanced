import { SigninUsecase } from '@/users/application/usecases/signin.usecase';

export class SigninDto implements SigninUsecase.Input {
  email: string;
  password: string;
}
