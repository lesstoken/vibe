import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export const metamaskConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

export const walletconnectConnector = new WalletConnectConnector({ 
    rpc: { 
        1: 'https://mainnet.infura.io/v3/ff087ba9578e4e0995028c853425a591',
        3: 'https://ropsten.infura.io/v3/ff087ba9578e4e0995028c853425a591',
        4: 'https://rinkeby.infura.io/v3/ff087ba9578e4e0995028c853425a591',
        5: 'https://goerli.infura.io/v3/ff087ba9578e4e0995028c853425a591',
        42: 'https://kovan.infura.io/v3/ff087ba9578e4e0995028c853425a591'
    } ,
    chainId: [1, 3, 4, 5, 42],
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
})
