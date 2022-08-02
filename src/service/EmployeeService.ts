import { plainToClass } from "class-transformer";
import { Employee } from "../app/entities/Employee";
import EntityNotFoundException from "../app/exception/EntityNotFoundException";
import HttpException from "../app/exception/HttpException";
import { ErrorCodes } from "../app/util/errorCode";
import { EmployeeRepository } from "../reppository/employeeRepo";
import jsonwebtoken from "jsonwebtoken";

import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../app/exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../app/exception/IncorrectUsernameOrPasswordException";

export class EmployeeService{

    constructor(private employeeRepo : EmployeeRepository){

    }
    getAllEmployees(){
        
        return this.employeeRepo.getAllEmployees();
    }
    async getEmployeeId(id:string){
        const employee = await this.employeeRepo.getEmployeeId(id);
        if(!employee){
            throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND)
        }
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
                departmentId: employeeDetails.departmentId,
                password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10): '',
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
    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeeRepo.getEmployeeByUsername(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD);
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };
    
   
    }