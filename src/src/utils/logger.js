import winston from 'winston';

const logLevels = {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
};

const logger = winston.createLogger({
    levels: logLevels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
        }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

export default logger;