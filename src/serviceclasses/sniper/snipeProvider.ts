import Web3 from 'web3';
import { providers, Wallet } from "ethers";
import HDWalletProvider from '@truffle/hdwallet-provider'
import { StatusConstants } from "../../constants/StatusConstants";


if (process.env.NODE_ENV === "production") {
    require("custom-env").env();
  } else {
    require("custom-env").env("development");
  }


export class setupProvider{
    public static async web3provide():Promise<Web3>{ 
        let providerURL = StatusConstants.networkUrl+process.env.infuraKey
        // console.log(privyLock)
        const Provider = await new HDWalletProvider("privyLock", providerURL);
        let web3 = await new Web3(Provider);

        return web3
    }
    public static async ethersProvide(CHAIN_ID: any){
      const provider = new providers.InfuraProvider(CHAIN_ID)

      if (process.env.privyLock === undefined) {
         console.error("Please provide PRIVY_KEY env")
         process.exit(1)
      }
      const wallet = new Wallet(process.env.privyLock, provider)

      return {wallet,provider}
    }
    
}