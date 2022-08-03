import { IsNumber, IsString, IsUUID } from "class-validator";

export class PDto {
    @IsUUID()
    public id: string;


}