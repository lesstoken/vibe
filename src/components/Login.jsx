import background from '../assets/images/login-background.jpg'
import logo from '../assets/images/logo-white.svg'
import metamask from '../assets/images/metamask.svg'
import walletconnect from '../assets/images/walletconnect.svg'

function Login() {
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
                        <div className="login-btn">
                            <img src={metamask} alt="metamask-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">MetaMask</span>
                        </div>
                        <div className="login-btn">
                            <img src={walletconnect} alt="walletconnect-icon" className="login-btn-icon"/>
                            <span className="login-btn-text">WalletConnect</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Login