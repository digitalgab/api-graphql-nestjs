import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistsConstraint } from './exists.validator';

export function Exists(
  entity: any,
  column: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: ExistsConstraint,
    });
  };
}
