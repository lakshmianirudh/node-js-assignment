import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeAddressDto {
    @IsOptional()
    @IsString()
    public state: string;

    @IsOptional()
    @IsString()
    public district:string;
    
}