import React, {useState} from 'react'
import background from '../assets/images/login-background.jpg'
import logo from '../assets/images/logo-white.svg'
import metamask from '../assets/images/metamask.svg'
import walletconnect from '../assets/images/walletconnect.svg'
import { walletconnectConnector, metamaskConnector } from '../connectors'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {useWalletContext} from '../contexts/WalletContext'
import {useCallback} from 'react'

function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { loggedInWallet, setLoggedInWallet } = useWalletContext()
    const web3ReactWallet = useWeb3React()

    const setWallet = useCallback(async () => {
        setIsLoading(true)
        let ensName = null
        if (web3ReactWallet.chainId !== 42) ensName = await web3ReactWallet.library.lookupAddress(web3ReactWallet.account)
        let shortAddress = web3ReactWallet.account.slice(0, 6) + '...' + web3ReactWallet.account.slice(-4)
        setLoggedInWallet({...web3ReactWallet, shortAddress, ensName})
        navigate('/')
    }, [web3ReactWallet, setLoggedInWallet, navigate])


    useEffect(() => {
        if (loggedInWallet.active) navigate('/')
        else if (web3ReactWallet.active) setWallet()
    }, [loggedInWallet, navigate, web3ReactWallet, setWallet])

    return (
        <div className="login-wrapper">
            <div className="login-left-wrapper">
                <img src={background} alt="background" className="background" />
                <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="login-right-wrapper">
                <div className="login-right-inner-wrapper">
                    <div className="gradient"></div>
                    <h1 className="login-h1">Connect your wallet</h1>
                    <p className="login-p">Need help connecting a wallet? <a href="/faq">Read our FAQ</a></p>
                    <div className="login-btns-wrapper">
                        <button 
                            className="login-btn" 
                            onClick={() => web3ReactWallet.activate(metamaskConnector)}
                            disabled={isLoading}
                        >
                            <img src={metamask} alt="metamask-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">MetaMask</span>
                        </button>
                        <button 
                            className="login-btn" 
                            onClick={() => web3ReactWallet.activate(walletconnectConnector)}
                            disabled={isLoading}
                        >
                            <img src={walletconnect} alt="walletconnect-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">WalletConnect</span>
                        </button>
                    </div>
                    {
                        isLoading &&
                        <div className="login-loading">
                            <div className="loading-spinner"></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}



export default Login