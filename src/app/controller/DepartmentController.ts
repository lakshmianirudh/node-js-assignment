
import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../../service/DepartmentService";
import  validationMiddleware  from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/createDepartmentDto";

class DepartmentController extends AbstractController {
  constructor(private DepartmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.dResponse);
    this.router.post(
        `${this.path}`,
        validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
        // this.asyncRouteHandler(this.createDepartment)
        this.createDepartment
      );
      this.router.get(`${this.path}/:id`,this.getDepartmentId);
      this.router.delete(`${this.path}/:id`,this.deleteDepartmentById);
      this.router.put(`${this.path}/:id`,this.updateDepartmentById);
  }
  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.DepartmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private dResponse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data: any = await this.DepartmentService.getAllDepartments();
      response.status(200);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private getDepartmentId = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.DepartmentService.getDepartmentId(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private deleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.DepartmentService.deleteDepartmentById(id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = request.params.id;
      const data = await this.DepartmentService.updateDepartmentById(id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
}

export default DepartmentController;