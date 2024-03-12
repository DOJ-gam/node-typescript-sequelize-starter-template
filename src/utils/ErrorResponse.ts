/**
 * @param {string} message - The error message.
 * @param {number} statusCode - The HTTP status code.
 */
class ErrorResponse extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
