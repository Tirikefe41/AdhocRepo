import {ContractAddress, mintDateTime,  quantity,MintPrice, keyIndex} from '@configs/UIConfig.json'
import { setupProvider } from './snipeProvider'
import { snipeUtils } from './snipeUtils';

export class snipeBot{

    // cntAddress: string;
 
    // constructor(contractAddress: string) {
    //     this.cntAddress = contractAddress;
    // }

    public static async canSnipe():Promise<string>{

        let _web3 = await setupProvider.web3provide()
        let account = await _web3.eth.getAccounts()
        let abi = JSON.parse(await snipeUtils.getABI(ContractAddress))
        // console.log(`found abi of type ${typeof(abi)}`)
        let _contract = new _web3.eth.Contract(abi, ContractAddress)
        console.log(`Expected Dateime ${mintDateTime}`)
        await snipeUtils.trackMintTime(mintDateTime)
        // .then(() =>{
        //     this.snipeMoment(_contract,account, quantity)
        // })
        
        return Promise.resolve(`Bot Sniped !!`)
    }

    public static async snipeMoment(contractor: any, _account: string [],amt: any){
        let owner = _account[0]

        // let totalMinted = await contractor.methods.walletOfOwner(owner).call()
        let minted = 0

        while (minted < amt){
            try{

                contractor.methods.mint(owner,MintPrice)

            }catch(err){
                console.error(`Mint Error: ${err}`)
            }

            // await contractor.methods.walletOfOwner(owner).call()
        }                
    }
}