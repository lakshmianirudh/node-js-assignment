import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Address } from "cluster";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { CreateEmployeeAddressDto } from "./CreateEmployeeAddressDto";

export class CreateEmployeeDto {
    @IsString()
    public name: string;
    
    @IsString()
    public username: string;

    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsString()
    public joiningDate: string;

    @IsString()
    public password: string;

    @IsString()
    public departmentId: string;

    @ValidateNested({ each: true })
  @Type(() => CreateEmployeeAddressDto)
    employeeaddress: EmployeeAddress;

    
}