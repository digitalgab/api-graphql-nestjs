import { Field, InputType, Int } from "@nestjs/graphql";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class UpdatePetInput {
  @Field(() => Int)
  id: number;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @IsIn(['Cat', 'Dog', 'cat', 'dog'], {
    message: 'Tipo de animal inválido. Deve ser Cat ou Dog',
  })  
  @Field({ nullable: true })
  type?: string;
}
