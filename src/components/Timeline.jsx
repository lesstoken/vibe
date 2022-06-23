import React, { useCallback, useEffect, useState} from 'react'
import { ethers, BigNumber } from 'ethers'
import { ropstenABI, rinkebyABI } from '../utils/abis.js'
import blueLogo from '../assets/images/logo-blue.svg'
import PostCard from './PostCard';
import { getTimeSince, preparePostData } from '../utils/utils';
import searchIcon from '../assets/images/search-icon.svg'
import avatar from '../assets/images/avatar.svg'
import {useWalletContext} from '../contexts/WalletContext.js'
import {  useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

function Timeline() {
    const navigate = useNavigate()
    const { loggedInWallet, setLoggedInWallet } = useWalletContext()
    console.log(loggedInWallet)
    const [isNetworkUnsupported, setIsNetworkUnsupported] = useState(true)
    const [posts, setPosts] = useState([])
    const placeholder = loggedInWallet.ensName ? `How's your Vibe today, ${loggedInWallet.ensName}?` : "How's your Vibe today?"
    const abi = loggedInWallet.chainId === 3 ? ropstenABI : rinkebyABI
    const contractAddress = loggedInWallet.chainId === 3 ? '0xD208456A8aC709361Ca327B9329113aD3C0A9FD9' : '0x9120b19e921fAf41d315B528dE711f99cf530725'


    const fetchPosts = useCallback(async () => {
        try {
            let provider = loggedInWallet.library || new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ff087ba9578e4e0995028c853425a591')
            const contract = new ethers.Contract(contractAddress, abi, provider)
            const latestPostID =  await contract.getLatestPostID()
            const num = latestPostID.sub(4)
            const posts = await contract.fetchPostsRanged(num, 5)
            let preparedPosts = await Promise.all( posts.map( async post => {
                //This will throw an error if the value is greater than or equal to Number.MAX_SAFE_INTEGER or less than or equal to Number.MIN_SAFE_INTEGER.
                let postDateTimestamp = post.timestamp.toNumber()
                return await preparePostData(post, provider, postDateTimestamp, getTimeSince)
            }))
            return preparedPosts.reverse()
        } catch(err) {
            console.log(err)
        }
    }, [loggedInWallet, contractAddress, abi ])

    
    useEffect(() => {
        if (loggedInWallet.chainId === 3 || loggedInWallet.chainId === 4 || loggedInWallet.chainId === undefined) setIsNetworkUnsupported(false)
    }, [loggedInWallet])

    useEffect(() => {
        if (isNetworkUnsupported) return
        fetchPosts().then(res => setPosts(res))
    }, [ isNetworkUnsupported, fetchPosts])


    function handleLoginButton() {
        if (loggedInWallet.active) {
            loggedInWallet.deactivate()
            setLoggedInWallet({})
        }
        navigate('/login')
    }

    return (
        <div className="timeline-wrapper">
            <div className="timeline-inner-wrapper">
                <aside className="timeline-left">
                    <div className="timeline-left-inner">
                        <img src={blueLogo} alt="logo-blue" className="logo-blue" />
                        <button className="btn btn-blue btn-big">Write A Post</button>
                    </div>
                </aside>
                {
                    isNetworkUnsupported ? 
                    <div className="network-wrapper">
                        <div className="network-inner-wrapper">
                            <h1 className="network-title">This app supports ETH. You are currently connected to an unsupported network.</h1>
                            <button className="btn btn-blue btn-big">Switch to Ethereum</button>
                            <h2 className="network-subtitle">You may need to manually switch network via your wallet.</h2>
                        </div>
                    </div>
                    :
                    <main className="main-wrapper">
                        <div className="main-inner-wrapper">
                            <div className="search">
                                <input type="text" className="search-input" placeholder="Search..." />
                                <img src={searchIcon} alt="search-icon" className="search-icon" />
                            </div>
                            <h1 className="main-heading">Update your Vibe</h1>
                            <div className="your-vibe">
                                <div className="your-vibe-input-wrapper">
                                    <img src={avatar} alt="user-avatar" className="your-vibe-user-avatar" />
                                    <input type="text" placeholder={placeholder} className="your-vibe-input" />
                                </div>
                                <button className="post-btn btn btn-blue">POST</button>
                            </div>
                            <h1 className="main-heading">Feed</h1>
                            {posts?.length && posts.map(post => <PostCard key={uuidv4()} post={post} />)}
                        </div>
                    </main>
                }
                <aside className="timeline-right">
                    <div className="timeline-right-inner">
                        <button 
                        className="btn btn-blue btn-big"
                        onClick={handleLoginButton}
                        >
                            {loggedInWallet.active ? loggedInWallet.ensName ? loggedInWallet.ensName : loggedInWallet.shortAddress : 'Login'}
                        </button>
                    </div>
                </aside>
            </div>
            <div className="timeline-gradient-left"></div>
            <div className="timeline-gradient-right"></div>
        </div>
    )
}

export default Timeline