import { SignupUsecase } from '@/users/application/usecases/signup.usecase';

export class SignupDto implements SignupUsecase.Input {
  name: string;
  email: string;
  password: string;
}
