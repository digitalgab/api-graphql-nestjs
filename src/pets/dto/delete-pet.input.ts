import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeletePetInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;
}
