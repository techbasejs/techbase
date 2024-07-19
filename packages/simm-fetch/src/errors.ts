
export class CustomError extends Error {
    public statusCode: number;
    public data?: any;
  
    constructor(message: string, statusCode: number, data?: any) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message = 'Bad Request', data?: any) {
      super(message, 400, data);
      Object.setPrototypeOf(this, BadRequestError.prototype);
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message = 'Unauthorized', data?: any) {
      super(message, 401, data);
      Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
  }
  
  // ... Define other custom errors similarly
  