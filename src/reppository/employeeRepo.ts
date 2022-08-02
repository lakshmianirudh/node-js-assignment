import { getConnection } from "typeorm";
import { Employee } from "../app/entities/Employee";

export class EmployeeRepository{
    async getAllEmployees(){
         const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    async getEmployeeId(id:string){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }
    public async deleteEmployeeById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({id});
    }
    public async updateEmployeeById(employeeId: string, employeeDetails: any) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: employeeId, deletedAt: null }, {
            name: employeeDetails.name ? employeeDetails.name : undefined,
        });
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
