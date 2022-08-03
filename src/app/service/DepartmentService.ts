import { plainToClass } from "class-transformer";
import { CreateDepartmentDto } from "../dto/createDepartmentDto";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../reppository/departmentRepo";

export class DepartmentService{

    constructor(private DepartmentRepo : DepartmentRepository){

    }
    getAllDepartments(){
        
        return this.DepartmentRepo.getAllDepartments();
    }
    public async createDepartment(DepartmentDetails: CreateDepartmentDto) {
        try {
           
            const save = await this.DepartmentRepo.saveDepartmentDetails(DepartmentDetails);
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