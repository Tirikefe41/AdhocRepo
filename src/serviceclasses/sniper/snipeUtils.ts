// import { setupProvider } from './snipeProvider'
import { StatusConstants } from "../../constants/StatusConstants";

import axios from 'axios'

export class snipeUtils{

        public static async getABI(address: string){
            let link = `${StatusConstants.urlABI.ethereum}${address}&apikey=${process.env.etherscanAPIKey}`
            const response = await axios.get(link);
            return response.data.result;
        }

        public static async trackMintTime(mintDateTime: string):Promise<boolean>
            {
                console.log(`Read Date: ${mintDateTime}`)
                var countDownDate = new Date(mintDateTime).getTime();
                let tracker = false
                console.log(`Mint Date: ${new Date(countDownDate)}`)

                // Run myfunc every second
                var myfunc = setInterval(function() {

                    var now = new Date().getTime();
                    // console.log(`Current Date: ${new Date(now)}`)
                    var timeleft = countDownDate - now;
                    // var dateStr = timeleft.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "
                    var showtimeLeft = snipeUtils.convertToDays(timeleft)
                    console.log(`${showtimeLeft.days}days ${showtimeLeft.hours}hours ${showtimeLeft.minutes}mins
                                ${showtimeLeft.seconds}secs to go...`)
                        
                    
                    if (timeleft <= 0) {                    
                        console.log('Countdown completed...')
                        clearInterval(myfunc);
                        tracker = true
                        
                    }
                }, 1000);

                // if (tracker)
                return tracker                
    }

        public static convertToDays(milliSeconds: number){
            let days = Math.floor(milliSeconds/(86400 * 1000));
            milliSeconds -= days*(86400*1000);
            let hours = Math.floor(milliSeconds/(60 * 60 * 1000 ));
            milliSeconds -= hours * (60 * 60 * 1000);
            let minutes = Math.floor(milliSeconds/(60 * 1000));
            milliSeconds -= minutes * (60 * 1000);
            let seconds = Math.floor(milliSeconds)/ 1000

            return {
              days,hours,minutes, seconds
            }               
        }
}