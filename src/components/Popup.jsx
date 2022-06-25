import avatar from '../assets/images/avatar.svg'
import {useWalletContext} from '../contexts/WalletContext'


function Popup({ type, setPopup }) {
    const { loggedInWallet } = useWalletContext()

    let placeholder = null
    let btnText = null
    let inputType = null

    switch(type) {
        case 'write':
            placeholder = loggedInWallet.ensName ? `How's your Vibe today, ${loggedInWallet.ensName}?` : "How's your Vibe today?"
            btnText = 'POST'
            inputType = 'text'
            break
        case 'donate':
            placeholder = 'Enter amount of ETH you want to donate...'
            btnText = 'DONATE'
            inputType = 'number'
            break
        default:
            placeholder = ''
            btnText = 'VIBE'
            inputType = 'text'
    }


    return (
        <div className="popup-outer" onClick={() => setPopup(null)}>
            <div className="popup" onClick={e => e.stopPropagation()}>
                <div className="popup-inner">
                    <div className="popup-input-btn">
                        <div className="popup-input-wrapper">
                            <img src={avatar} alt="user-avatar" className="popup-avatar" />
                            {
                                inputType === 'text' ?
                                    <textarea placeholder={placeholder} className="popup-input popup-textarea"></textarea>
                                :
                                inputType === 'number' ?
                                    <input type="number" placeholder={placeholder} className="popup-input"/>
                                :
                                    <input type="text" placeholder={placeholder} className="popup-input"/>
                            }
                        </div>
                        <button className="post-btn btn btn-blue">{btnText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup