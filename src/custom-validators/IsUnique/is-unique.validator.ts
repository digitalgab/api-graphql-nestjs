import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { DataSource } from 'typeorm';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class UniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly dataSource: DataSource) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      const [entity, column] = args.constraints; // Recebe a entidade e o nome da coluna
      const repository = this.dataSource.getRepository(entity);
      
      // Procura um registro que possua o valor na coluna especificada
      const record = await repository.findOneBy({ [column]: value });
  
      // Retorna true se NÃO encontrar o registro (ou seja, o valor é único)
      return !record;
    }
  
    defaultMessage(args: ValidationArguments): string {
      return `${args.property} já está em uso.`;
    }
  }
  