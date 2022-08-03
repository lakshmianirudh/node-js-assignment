import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateEmployeeAddressDto {
    
    @IsString()
    public state: string;

    
    @IsString()
    public district:string;
    
}