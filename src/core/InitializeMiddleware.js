"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeMiddleWare = void 0;
const CommonMiddleware_1 = require("../middleware/CommonMiddleware");
const ErrorHandlingMiddleware_1 = require("../middleware/ErrorHandlingMiddleware");
class InitializeMiddleWare {
    static InitializeCommonMiddleware(app) {
        return __awaiter(this, void 0, void 0, function* () {
            let middleware = new CommonMiddleware_1.CommonMiddleware(app);
            yield middleware.useBodyParser();
            yield middleware.useURLencoded();
            yield middleware.useCors();
            yield middleware.logRequests();
        });
    }
    static InitializeErrorHandlingMiddleware(app) {
        return __awaiter(this, void 0, void 0, function* () {
            let errorMiddleware = new ErrorHandlingMiddleware_1.ErrorHandlingMiddleware(app);
            yield errorMiddleware.handle404Error();
        });
    }
}
exports.InitializeMiddleWare = InitializeMiddleWare;
