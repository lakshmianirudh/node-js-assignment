import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsString()
    public joiningDate: string;
}