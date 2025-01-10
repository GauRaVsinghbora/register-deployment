class apiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = []) {
        super(message);
        this.data = null;
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        // Capture the stack trace for better debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export { apiError };
