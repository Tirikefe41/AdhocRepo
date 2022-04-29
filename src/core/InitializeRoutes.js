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
exports.InitializeRoutes = void 0;
const snipeBotRouteController_1 = require("../routes/sniper/snipeBotRouteController");
class InitializeRoutes {
    static Initialize(app, link) {
        return __awaiter(this, void 0, void 0, function* () {
            let routes = yield this.getRoutes(link);
            routes.forEach(rc => {
                app.use("/", rc.router);
            });
        });
    }
    static getRoutes(link) {
        return __awaiter(this, void 0, void 0, function* () {
            let routes = [];
            routes.push(new snipeBotRouteController_1.snipeBotRouteController(link));
            return Promise.resolve(routes);
        });
    }
}
exports.InitializeRoutes = InitializeRoutes;
