import { plainToClass } from "class-transformer";
import { Department } from "../app/entities/Department";
import HttpException from "../app/exception/HttpException";
import { DepartmentRepository } from "../reppository/departmentRepo";

export class DepartmentService{

    constructor(private DepartmentRepo : DepartmentRepository){

    }
    getAllDepartments(){
        
        return this.DepartmentRepo.getAllDepartments();
    }
    public async createDepartment(DepartmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: DepartmentDetails.name,
                // username: DepartmentDetails.username,
                // age: DepartmentDetails.age,
                departmentId: DepartmentDetails.departmentId
                // isActive: true,
            });
            const save = await this.DepartmentRepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create Department", "FAILED");
        }
    }
    async deleteDepartmentById(id:string){
        return await this.DepartmentRepo.deleteDepartmentById(id);
    }
    async updateDepartmentById(id:string,DepartmentDetails: any){

        return await this.DepartmentRepo.updateDepartmentById(id,DepartmentDetails);
    }
    async getDepartmentId(id:string){
        return await this.DepartmentRepo.getDepartmentId(id);
    }
    }