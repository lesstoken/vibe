import React from 'react'
import background from '../assets/images/login-background.jpg'
import logo from '../assets/images/logo-white.svg'
import metamask from '../assets/images/metamask.svg'
import walletconnect from '../assets/images/walletconnect.svg'
import { walletconnectConnector, metamaskConnector } from '../connectors'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const wallet = useWeb3React();
    // connector, library, chainId, account, activate, deactivate, active, error
    const { activate, active } = wallet;

    useEffect(() => {
        if (active) navigate('/timeline')
    }, [active, navigate])

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
                        <button className="login-btn" onClick={() => activate(metamaskConnector)}>
                            <img src={metamask} alt="metamask-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">MetaMask</span>
                        </button>
                        <button className="login-btn" onClick={() => activate(walletconnectConnector)}>
                            <img src={walletconnect} alt="walletconnect-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">WalletConnect</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Login