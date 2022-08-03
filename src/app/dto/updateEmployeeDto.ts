import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { CreateEmployeeAddressDto } from "./CreateEmployeeAddressDto";

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    public name?: string;
    @IsOptional()
    @IsString()
    public status?: string;
    @IsOptional()
    @IsString()
    public joiningDate?: string;
    @IsOptional()
    @IsString()
    public role?: string;
    @IsOptional()
    @IsString()
    public departmentId: string;
    @IsOptional()
    @IsString()
    public password: string;
    @IsOptional()
    @ValidateNested({ each: true })
  @Type(() => CreateEmployeeAddressDto)
    employeeaddress: EmployeeAddress;
}