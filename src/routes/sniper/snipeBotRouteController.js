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
exports.snipeBotRouteController = void 0;
const AbstractRouteController_1 = require("../AbstractRouteController");
const snipemint_1 = require("../../serviceclasses/sniper/snipemint");
const StatusConstants_1 = require("../../constants/StatusConstants");
class snipeBotRouteController extends AbstractRouteController_1.AbstractRouteController {
    constructor(link) {
        super();
        this.path = '/snipenow';
        this.InitializeController(link);
    }
    runService(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield snipemint_1.snipeBot.canSnipe();
            resp.status(StatusConstants_1.StatusConstants.code200).send(response);
        });
    }
}
exports.snipeBotRouteController = snipeBotRouteController;
