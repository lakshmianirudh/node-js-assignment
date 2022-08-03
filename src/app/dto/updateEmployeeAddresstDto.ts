import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateEmployeeAddressDto {
    @IsOptional()
    @IsString()
    public state: string;

    @IsOptional()
    @IsString()
    public district: string;

}