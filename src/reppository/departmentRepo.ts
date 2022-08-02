import { getConnection } from "typeorm";
import { Department } from "../app/entities/Department";

export class DepartmentRepository{
    async getAllDepartments(){
         const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.find();
    }

    public async saveDepartmentDetails(DepartmentDetails: Department) {
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.save(DepartmentDetails);
    }
    async getDepartmentId(id:string){
        const DepartmentRepo = getConnection().getRepository(Department);
        return DepartmentRepo.findOne(id);
    }
    public async updateDepartmentById(DepartmentId: string, DepartmentDetails: any) {
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
