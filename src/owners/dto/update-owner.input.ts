import { IsString } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => Int)
  id: number;
  
  @IsString()
  @Field()
  name: string;
}
