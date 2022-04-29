"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apserver = void 0;
require('module-alias/register');
const Server_1 = require("./src/core/Server");
let aps = (0, Server_1.server)();
exports.apserver = aps;
