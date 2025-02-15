import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
