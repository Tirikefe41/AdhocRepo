import { setupProvider } from './snipeProvider'
import { StatusConstants } from "../../constants/StatusConstants";

import axios from 'axios'


export class snipeContract{

    public static async getABI(address: string){
        let link = `${StatusConstants.urlABI.ethereum}${address}&apikey=${process.env.etherscanAPIKey}`
        const response = await axios.get(link);
        return response.data.result;
    }
}