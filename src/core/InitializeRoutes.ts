import { Express } from 'express'
import { snipeBotRouteController } from '../routes/sniper/snipeBotRouteController'
import { checkerRouteController } from '../routes/checker/checker'
import { AbstractRouteController } from '../routes/AbstractRouteController'
export class InitializeRoutes {

    public static async Initialize(app: Express, link: string) {
        let routes = await this.getRoutes(link)

        routes.forEach(rc => {
            app.use("/", rc.router)
        })
    }
    // app.get("*", function(req, res, next) {
    //     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    //   });
    public static async getRoutes(link: string): Promise<Array<AbstractRouteController>> {
        let routes: Array<AbstractRouteController> = []
        routes.push(new snipeBotRouteController(link))
        routes.push(new checkerRouteController(link))        
        return Promise.resolve(routes)
    }
}