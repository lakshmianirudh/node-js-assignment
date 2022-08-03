import { DeepPartial, getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { Employee } from "../entities/Employee";

export class EmployeeRepository{
    async getAllEmployees():Promise<Employee[]>{
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations :['department','employeeaddress']});
    }

    public async saveEmployeeDetails(employeeDetails: CreateEmployeeDto):Promise<CreateEmployeeDto & Employee>{
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    async getEmployeeId(id:string ,relations: string[] = ["employeeaddress","department"]):Promise<Employee>{
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.findOne(id, { relations: ["employeeaddress"]});
        return emp;
    }
    public async deleteEmployeeById(id: string):Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        const employe = await this.getEmployeeId(id,["employeeaddress"]);
        return employeeRepo.softRemove(employe);
    }
    public async updateEmployeeById(employeeId: string, employeeDetails: DeepPartial<Employee>) {
        const employeeRepo = getConnection().getRepository(Employee);
        
        employeeDetails.id = employeeId;
        console.log('kkjhgbhh',employeeDetails);
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails);
        return updateEmployeeDetails;
    }
    public async getEmployeeByUsername(username: string) : Promise<Employee>{
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name : username},
        });
        return employeeDetail;
    }
   
    
    }
