import { Field, InputType } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

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
  @Field({ nullable: true })
  type?: string;
}
