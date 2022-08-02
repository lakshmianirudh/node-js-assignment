import { IsNumber, IsString, IsUUID } from "class-validator";

export class PDto {
    @IsUUID()
    public id: string;

    // @IsString()
    // public role: string;

    // @IsString()
    // public status: string;

    // @IsString()
    // public joiningDate: string;
}