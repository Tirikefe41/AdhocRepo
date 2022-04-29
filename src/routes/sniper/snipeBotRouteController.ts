import {Response,Request} from 'express'
import { snipeBot } from "../../serviceclasses/sniper/snipemint"
import { StatusConstants } from "../../constants/StatusConstants"
import { AbstractRouteController } from "../AbstractRouteController"


const Queue = require('bull');


if (process.env.NODE_ENV === "production") {
    require("custom-env").env();
  } else {
    require("custom-env").env("development");
  }
const {REDIS_URL} = process.env


const botQueue = new Queue('Sniper instance...', REDIS_URL)
        // console.log('Queue instance created...')
        
botQueue.process(4, async (job: any) => {
        console.log(`Job ${job.id} started...`)
        await snipeBot.canSnipe(job.data.params)
        return Promise.resolve(`Snipe job ${job.id} completed!`)
});

export class snipeBotRouteController extends AbstractRouteController {

    constructor(link:string){
        super();
        this.path = '/snipenow';
        this.InitializeController(link);
    }

    public async runService(req: Request, resp: Response):Promise<any>{     
        try{
            console.log('Queuing Job...')
            const job = await botQueue.add({
                params: req.body,
              })
              console.log('Job Queued')
    
            const result = await job.finished().then(() =>{                
                  resp.status(StatusConstants.code200).send(result)
                  botQueue.close()
            })            
        }

        catch(err: any){
            resp.status(StatusConstants.code500).send({error: err.message})
        }        
    }
}