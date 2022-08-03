import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../../service/EmployeeService";
import  validationMiddleware  from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { PDto } from "../dto/pdto";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(['admin','superadmin']),this.eResponse);
    this.router.post(
        `${this.path}`,
        validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
        authorize(['admin']),
        // this.asyncRouteHandler(this.createEmployee)
        this.createEmployee
      );
      this.router.get(`${this.path}/:id`,authorize(['admin']),validationMiddleware(PDto, APP_CONSTANTS.params),this.getEmployeeId);
      this.router.delete(`${this.path}/:id`,
      authorize(['admin']),
      validationMiddleware(PDto, APP_CONSTANTS.params),this.deleteEmployeeById);
      this.router.put(`${this.path}/:id`,
      authorize(['admin']),
      validationMiddleware(PDto, APP_CONSTANTS.params),
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),this.updateEmployeeById);
      this.router.post(
        `${this.path}/login`,
        this.login
      );
    
  }
  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  
  
  private eResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private getEmployeeId = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.employeeService.getEmployeeId(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.employeeService.deleteEmployeeById(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.employeeService.updateEmployeeById(id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
      const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );

    }catch(err){
      next(err);

    }
    
  };
  
}


export default EmployeeController;