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
  export class ExistsConstraint implements ValidatorConstraintInterface {
    constructor(private readonly dataSource: DataSource) {}
  
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
      // args.constraints recebe a entidade e a coluna que será verificada, por exemplo: ['User', 'id']
      const [entity, column] = args.constraints;
      const repository = this.dataSource.getRepository(entity);
  
      // Procura um registro com o valor na coluna especificada
      const record = await repository.findOneBy({ [column]: value });
  
      // Retorna true se o registro EXISTIR
      return !!record;
    }
  
    defaultMessage(args: ValidationArguments): string {
      return `O valor informado para ${args.property} não corresponde a um registro existente.`;
    }
  }  