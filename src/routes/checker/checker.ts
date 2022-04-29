import {Response,Request} from 'express'
import { AbstractRouteController } from "../AbstractRouteController"
import { StatusConstants } from "../../constants/StatusConstants"



export class checkerRouteController extends AbstractRouteController {

    constructor(link:string){
        super();
        this.path = '/check';
        this.InitializeController(link);
    }

    public async runService(req: Request, resp: Response):Promise<any>{   
        resp.status(StatusConstants.code200).send({status: "ok"})       
    }
}