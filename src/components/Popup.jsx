import { useState } from 'react'
import avatar from '../assets/images/avatar.svg'
import { useWalletContext } from '../contexts/WalletContext'
import { ethers } from 'ethers'
import { ropstenABI, rinkebyABI } from '../utils/abis.js'



function Popup({ type, setPopup, contract, setPosts }) {
    const { loggedInWallet } = useWalletContext()
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

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

    function handleInputChange(value) {
        if (error) setError('')
        setInputValue(value)
    }

    async function submitPost() {
        try {
            if (inputValue.length < 1) return setError('Post content can not be empty')
            const PRIVATE_KEY = '02ea84daac6c1755a116c3cd82a7b81fbe5ee42db24ea1924211bb04bf6c5090'
            const wallet = new ethers.Wallet(PRIVATE_KEY, loggedInWallet.library)
            const tx = {
                to: '0xD208456A8aC709361Ca327B9329113aD3C0A9FD9',
                from: '0x2b586f8C4A0d64F48743B8636266d3528b3F0aDd',
                value: ethers.BigNumber.from(0),
                gasLimit: ethers.BigNumber.from(100000),
            }
            // const signature = await wallet.signTransaction(tx)
            // if (signature) {
                // const response = await wallet.sendTransaction(tx)
                const newContract =  new ethers.Contract('0xD208456A8aC709361Ca327B9329113aD3C0A9FD9', rinkebyABI, wallet)
                const submit = await newContract.createPost(inputValue)
                console.log(submit)
            // }
            // const create = await contract.createPost(inputValue)
            // console.log(create)





                
                // set posts
                // let newPost = {
                //     owner: provider.getSigner().getAddress(),
                //     text: inputValue,
                //     timestamp: Date.now() / 1000
                // }
                // let preparedPost = await preparePostsData([newPost], provider, getTimeSince)
                // setPosts(prev => [preparedPost[0], ...prev])
            // }
        } catch(err) {
            console.log(err)
        }
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
                                    <textarea placeholder={placeholder} className="popup-input popup-textarea" value={inputValue} onChange={e => handleInputChange(e.target.value)}></textarea>
                                :
                                inputType === 'number' ?
                                    <input type="number" placeholder={placeholder} className="popup-input" value={inputValue} onChange={e => handleInputChange(e.target.value)}/>
                                :
                                    <input type="text" placeholder={placeholder} className="popup-input" value={inputValue} onChange={e => handleInputChange(e.target.value)}/>
                            }
                        </div>
                        <button className="post-btn btn btn-blue" onClick={submitPost}>{btnText}</button>
                    </div>
                    <p className="popup-input-error">{error}</p>
                </div>
            </div>
        </div>
    )
}

export default Popup