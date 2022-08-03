import { getConnection } from "typeorm";
import { CreateDepartmentDto } from "../dto/createDepartmentDto";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { Department } from "../entities/Department";

export class DepartmentRepository{
    async getAllDepartments(): Promise<Department[]>{
         const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.find();
    }

    public async saveDepartmentDetails(DepartmentDetails: CreateDepartmentDto):Promise<CreateDepartmentDto & Department> {
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.save(DepartmentDetails);
    }
    async getDepartmentId(id:string): Promise<Department>{
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.findOne(id);
    }
    public async updateDepartmentById(DepartmentId: string, DepartmentDetails: Department) {
        const DepartmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await DepartmentRepo.update({ id: DepartmentId, deletedAt: null }, {
            name: DepartmentDetails.name ? DepartmentDetails.name : undefined,
        });
        return updateDepartmentDetails;
    }
    public async deleteDepartmentById(id: string) {
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.softDelete({id});
    }
    }
