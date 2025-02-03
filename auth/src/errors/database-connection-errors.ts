import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError{
    statusCode = 500;
    reason = 'Error connecting to database1';

    constructor(){
        super('Error connecting to database1');

        //only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason}];
    }


}