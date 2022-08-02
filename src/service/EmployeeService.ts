import { plainToClass } from "class-transformer";
import { Employee } from "../app/entities/Employee";
import HttpException from "../app/exception/HttpException";
import { EmployeeRepository } from "../reppository/employeeRepo";

export class EmployeeService{

    constructor(private employeeRepo : EmployeeRepository){

    }
    getAllEmployees(){
        
        return this.employeeRepo.getAllEmployees();
    }
    async getEmployeeId(id:string){
        return await this.employeeRepo.getEmployeeId(id);
    }
    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                role: employeeDetails.role,
                status: employeeDetails.status,
                joiningDate: employeeDetails.joiningDate,
                // username: employeeDetails.username,
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId
                // isActive: true,
            });
            const save = await this.employeeRepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee", "FAILED");
        }
    }
    async deleteEmployeeById(id:string){
        return await this.employeeRepo.deleteEmployeeById(id);
    }
    async updateEmployeeById(id:string,employeeDetails: any){

        return await this.employeeRepo.updateEmployeeById(id,employeeDetails);
    }
    
   
    }