import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format((info) => {
            info.message = `Log ${info.level} on core: \n${info.message}`;
            return info;
        })(),
    ),
});

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));
