import { DeepPartial, getConnection } from "typeorm";
import { Employee } from "../app/entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations :['department','employeeaddress']});
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    async getEmployeeId(id:string ,relations: string[] = ["employeeaddress","department"]){
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.findOne(id, { relations: ["employeeaddress"]});
        return emp;
    }
    public async deleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employe = await this.getEmployeeId(id,["employeeaddress"]);


        // return employeeRepo.softDelete({id});
        return employeeRepo.softRemove(employe);
    }
    public async updateEmployeeById(employeeId: string, employeeDetails: DeepPartial<Employee>) {
        const employeeRepo = getConnection().getRepository(Employee);
        
        // employeeDetails.id = employeeId;
        const updateEmployeeDetails = await employeeRepo.save(employeeDetails);
        return updateEmployeeDetails;
    }
    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name : username},
        });
        return employeeDetail;
    }
   
    
    }
