class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export { CustomError, errorHandler };