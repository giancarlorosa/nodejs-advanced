import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors | null = null;
  validatedData: PropsValidated | null = null;

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = error.constraints
          ? Object.values(error.constraints)
          : [''];
      }
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
