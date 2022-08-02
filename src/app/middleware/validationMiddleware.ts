import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request } from "express";
import * as express from "express";
import HttpException from "../exception/HttpException";
import APP_CONSTANTS from "../constants";
import { ErrorCodes } from "../util/errorCode";


/**
 * Middleware to validate the request.
 * Validations are performed using class validator
 */
function validationMiddleware<T>(type: any, parameter: string, skipMissingProperties = false): express.RequestHandler {
  return (req, res, next) => {
    let requestBody: any;
    if(parameter === "body"){
        
        requestBody = plainToClass(type, req.body); }
    else if(parameter === "params"){
    
            requestBody = plainToClass(type, req.params);
    console.log(requestBody);
    }
    
    validate(
      requestBody, { skipMissingProperties, forbidUnknownValues: true, whitelist: true })
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const errorDetail = ErrorCodes.VALIDATION_ERROR;
          next(new HttpException(400, errorDetail.MESSAGE, errorDetail.CODE, errors));
          // next(errors);
        } else if(parameter === "body"){
        
            req.body = requestBody;
            next(); }
        else if(parameter === "params"){
        
                req.params = requestBody ;
                next();
        }
      }); 
    
  };
}
export default validationMiddleware;