import { registerDecorator, ValidationOptions } from "class-validator";
import { UniqueConstraint } from "./is-unique.validator";

export function IsUnique(
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
        validator: UniqueConstraint,
      });
    };
  }
  