import React, { useContext, useState } from 'react'

const WalletContext = React.createContext()

export function useWalletContext() {
    return useContext(WalletContext)
}

export function WalletProvider({ children }) {
    const [loggedInWallet, setLoggedInWallet] = useState({
        // connector: undefined,
        // library: undefined,
        // chainId: 0,
        // account: '',
        // activate: undefined,
        // deactivate: undefined,
        // active: false,
        // error: undefined,
        // shortAddress: null
        // ensName: null
    })

    return (
        <WalletContext.Provider value={{ loggedInWallet, setLoggedInWallet}}>
                { children }
        </WalletContext.Provider>
    )
}