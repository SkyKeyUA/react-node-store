/** @format */

export class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static unauthorizedError() {
    return new ApiError(401, 'The user is not authorization');
  }
  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
  static internal(message) {
    return new ApiError(500, message);
  }
  static forbidden(message) {
    return new ApiError(403, 'No access');
  }
}
