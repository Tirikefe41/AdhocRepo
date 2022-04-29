// import {ContractAddress, mintDateTime,Network, MintPrice, quantity, executeData} from '@configs/UIConfig.json'
import { FlashbotsBundleProvider, FlashbotsBundleResolution } from "@flashbots/ethers-provider-bundle";
import { StatusConstants } from '../../constants/StatusConstants'
import { setupProvider } from './snipeProvider'
import { snipeUtils } from './snipeUtils';
import { Wallet,  BigNumber, utils, providers } from 'ethers'

interface requestForm
 {
    "mintDateTime": string,
    "executeData": string,
    "ContractAddress": string,
    "MintPrice": string,
    "keyIndex": string,
    "quantity": number,
    "Network": number 
}

export class snipeBot{

    public static async canSnipe(requestBoy: requestForm )
    {
        const provided = await setupProvider.ethersProvide(requestBoy.Network)        
        var countDownDate = new Date(requestBoy.mintDateTime).getTime();
        console.log(`Mint Date: ${new Date(countDownDate)}`)

        var myfunc = setInterval(async function() {

                var now = new Date().getTime();
                var timeleft = countDownDate - now;
                var showtimeLeft = snipeUtils.convertToDays(timeleft)

                console.log(`${showtimeLeft.days} days ${showtimeLeft.hours} hours ${showtimeLeft.minutes} mins
                            ${Math.floor(showtimeLeft.seconds)} secs to go...`)
                    
                
                if (timeleft <= 0) {                    
                    console.log('Countdown completed...')
                    clearInterval(myfunc);
                    try{
                        await snipeBot.snipeMoment(provided.wallet, provided.provider , requestBoy) 
                    }
                    catch(err){
                        console.error(`Flashbot error : ${err}`)
                    }                                      
                }
            }, 1000);           
    }

    public static async snipeMoment(_wallet: Wallet, _provider: any, inputField: any){
        const flashbotsProvider = await FlashbotsBundleProvider.create(_provider,
             Wallet.createRandom(), StatusConstants.FLASHBOTS_ENDPOINT)

        const GWEI = 10 ** 9
        var receipt;

        const initBalance = await _provider.getBalance(_wallet.address)
        console.log(`initbalance of type: ${(initBalance)}`)
             
        _provider.on('block', async (blockNumber: number) => {

            console.log(`blockNumber: ${blockNumber}`)
            
            const bundleSubmitResponse = await flashbotsProvider.sendBundle(
            [
                {
                transaction: {
                    chainId: inputField.Network,
                    type: 2,
                    value: BigNumber.from(utils.parseEther(inputField.MintPrice)),
                    data: inputField.executeData,
                    maxFeePerGas: 3 * GWEI,
                    maxPriorityFeePerGas: 2 *  GWEI,
                    to: inputField.ContractAddress
                },
                signer: _wallet
                }
            ], blockNumber + 1
            
            )

            if ('error' in bundleSubmitResponse) {
            console.warn(bundleSubmitResponse.error.message)
            return
            }
            let mintStatus = await bundleSubmitResponse.wait()
            console.log(`Mint status: ${mintStatus}`)

            if (!mintStatus){
                receipt = await bundleSubmitResponse.receipts()
                if (receipt){
                    console.log('Mint successful...')
                    // process.exit(0)  
                    _provider.off('block')                  
                }
            }
        })
    }        
}