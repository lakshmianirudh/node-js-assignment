import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { ErrorCodes } from "../util/errorCode";
import { EmployeeRepository } from "../reppository/employeeRepo";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { CreateEmployeeAddressDto } from "../dto/CreateEmployeeAddressDto";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";

export class EmployeeService {
  constructor(private employeeRepo: EmployeeRepository) {}
  getAllEmployees() {
    return this.employeeRepo.getAllEmployees();
  }
  async getEmployeeId(id: string) {
    const employee = await this.employeeRepo.getEmployeeId(id);
    if (!employee) {
      throw new EntityNotFoundException(ErrorCodes.EMPLOYEE_WITH_ID_NOT_FOUND);
    }
    return employee;
  }
  public async createEmployee(employeeDetails: CreateEmployeeDto) {
    try {
      employeeDetails.password = employeeDetails.password
        ? await bcrypt.hash(employeeDetails.password, 10)
        : "";
      const save = await this.employeeRepo.saveEmployeeDetails(employeeDetails);
      return save;
    } catch (err) {
      throw new HttpException(400, "Failed to create employee", "FAILED");
    }
  }
  async deleteEmployeeById(id: string) {
    const employee: Employee = await this.getEmployeeId(id);
    if (employee) {
      return await this.employeeRepo.deleteEmployeeById(id);
    }
  }

  async updateEmployeeById(id: string, employeeDetails: UpdateEmployeeDto) {
    const employee: Employee = await this.getEmployeeId(id);
    if (employee) {
      employeeDetails.password = employeeDetails.password
        ? await bcrypt.hash(employeeDetails.password, 10)
        : "";
      employeeDetails.employeeaddress.id = employee.employeeaddress.id;
      return await this.employeeRepo.updateEmployeeById(id, employeeDetails);
    }
  }
  public employeeLogin = async (name: string, password: string) => {
    const employeeDetails = await this.employeeRepo.getEmployeeByUsername(name);
    if (!employeeDetails) {
      throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
    }
    const validPassword = await bcrypt.compare(
      password,
      employeeDetails.password
    );
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        role: employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException(
        ErrorCodes.INCORRECT_USERNAME_OR_PASSWORD
      );
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}
