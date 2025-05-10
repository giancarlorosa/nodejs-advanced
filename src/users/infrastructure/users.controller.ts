import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignupDto } from './dto/signup.dto';
import { SignupUsecase } from '../application/usecases/signup.usecase';
import { SigninUsecase } from '../application/usecases/signin.usecase';
import { UpdateUserUsecase } from '../application/usecases/update-user.usecase';
import { UpdatePasswordUsecase } from '../application/usecases/update-password.usecase';
import { DeleteUserUsecase } from '../application/usecases/delete-user.usecase';
import { GetuserUsecase } from '../application/usecases/getuser.usecase';
import { ListUsersUsecase } from '../application/usecases/list-users.usecase';
import { SigninDto } from './dto/signin.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  @Inject(SignupUsecase.Usecase)
  private signupUseCase: SignupUsecase.Usecase;

  @Inject(SigninUsecase.Usecase)
  private signinUseCase: SigninUsecase.Usecase;

  @Inject(UpdateUserUsecase.Usecase)
  private updateUserUseCase: UpdateUserUsecase.Usecase;

  @Inject(UpdatePasswordUsecase.Usecase)
  private updatePasswordUseCase: UpdatePasswordUsecase.Usecase;

  @Inject(DeleteUserUsecase.Usecase)
  private deleteUserUseCase: DeleteUserUsecase.Usecase;

  @Inject(GetuserUsecase.Usecase)
  private getUserUseCase: GetuserUsecase.Usecase;

  @Inject(ListUsersUsecase.Usecase)
  private listUsersUseCase: ListUsersUsecase.Usecase;

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return this.signupUseCase.execute(signupDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    return this.signinUseCase.execute(signinDto);
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute({ id, ...updateUserDto });
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id });
  }
}
