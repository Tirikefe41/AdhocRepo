"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
const LoggerConfig_json_1 = require("@configs/LoggerConfig.json");
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            transports: [
                new winston_1.default.transports.Console(LoggerConfig_json_1.options.console),
                new winston_1.default.transports.File(LoggerConfig_json_1.options.file)
            ]
        });
    }
    static getLoggerInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    static getLogger() {
        let _logger = Logger.getLoggerInstance();
        return _logger.logger;
    }
}
exports.Logger = Logger;
