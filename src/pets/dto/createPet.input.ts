import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreatePet {
    @Field()
    name: string
    
    @Field({ nullable: true })
    type?: string
}