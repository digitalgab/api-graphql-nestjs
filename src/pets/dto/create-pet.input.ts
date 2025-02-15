import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Owner } from "src/owners/owner.entity";

@InputType()
export class CreatePetInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsIn(['Cat', 'Dog', 'cat', 'dog'], {
    message: 'Tipo de animal inválido. Deve ser Cat ou Dog',
  })  

  @IsNotEmpty()
  @Field()
  type: string;

  @IsNotEmpty()
  @Field(() => Int)
  ownerId: number;
}
