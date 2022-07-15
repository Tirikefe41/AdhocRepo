export class StatusConstants{

    public static code404 = 404
    public static code404Message = "Method Not Found" 

    public static code200 = 200

    public static code500 = 500

    public static networkUrl = 'https://mainnet.infura.io/v3/'

    public static urlABI = {
        "ethereum": "https://api.etherscan.io/api?module=contract&action=getabi&address=",
        "rinkeby": "https://api.etherscan.io/api?module=contract&action=getabi&address="
    }

    public static FLASHBOTS_ENDPOINT = "https://relay.flashbots.net"
}