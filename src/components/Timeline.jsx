import React, { useCallback, useEffect, useState} from 'react'
import { ethers, BigNumber } from 'ethers'
import { ropstenABI, rinkebyABI } from '../utils/abis.js'
import blueLogo from '../assets/images/logo-blue.svg'
import PostCard from './PostCard';
import { getTimeSince, preparePostData } from '../utils/utils';
import searchIcon from '../assets/images/search-icon.svg'
import avatar from '../assets/images/avatar.svg'
import { useWalletContext } from '../contexts/WalletContext.js'
import {  useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useRef } from 'react';

function Timeline() {
    const navigate = useNavigate()
    const { loggedInWallet, setLoggedInWallet } = useWalletContext()
    const [isNetworkUnsupported, setIsNetworkUnsupported] = useState(true)
    const [isLogoutVisible, setIsLogoutVisible] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMorePosts, setHasMorePosts] = useState(true)
    const [posts, setPosts] = useState([])

    const placeholder = loggedInWallet.ensName ? `How's your Vibe today, ${loggedInWallet.ensName}?` : "How's your Vibe today?"
    const abi = loggedInWallet.chainId === 3 ? ropstenABI : rinkebyABI
    const contractAddress = loggedInWallet.chainId === 3 ? '0xD208456A8aC709361Ca327B9329113aD3C0A9FD9' : '0x9120b19e921fAf41d315B528dE711f99cf530725'
    const batchAmount = 5


    const fetchPosts = useCallback(async() => {
        try {
            setIsFetching(true)
            const provider = loggedInWallet.library || new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ff087ba9578e4e0995028c853425a591') // useState()
            const contract = new ethers.Contract(contractAddress, abi, provider)
            const latestPostID =  await contract.getLatestPostID()
            let startID = latestPostID.sub(batchAmount * page - 1)
                if (startID.lt(0)) startID = ethers.BigNumber.from(0)

            let posts = []
                posts = await contract.fetchPostsRanged(startID, batchAmount)
                let filteredPosts = posts.filter(post => post.owner !== '0x0000000000000000000000000000000000000000')
                let preparedPosts = await Promise.all( filteredPosts.map( async post => {
                    //This will throw an error if the value is greater than or equal to Number.MAX_SAFE_INTEGER or less than or equal to Number.MIN_SAFE_INTEGER.
                    let postDateTimestamp = post.timestamp.toNumber()
                    return await preparePostData(post, provider, postDateTimestamp, getTimeSince)
                }))
                let revertedPrepearedPosts = preparedPosts.reverse()
            setPosts(prev => [...prev, ...revertedPrepearedPosts])

            if (startID.isZero()) setHasMorePosts(false)
            setIsFetching(false)

        } catch(err) {
            console.log(err)
            // setError(true)
        }
    }, [abi, contractAddress, loggedInWallet.library, page])
    
    
    useEffect(() => {
        if (loggedInWallet.chainId === 3 || loggedInWallet.chainId === 4 || loggedInWallet.chainId === undefined) setIsNetworkUnsupported(false)
    }, [loggedInWallet])

    useEffect(() => {
        if (!isNetworkUnsupported) fetchPosts()
    }, [isNetworkUnsupported, fetchPosts])


    function handleLogout() {
        loggedInWallet.deactivate()
        setLoggedInWallet({})
        navigate('/login')
    }


    // INFINITE SCROLL
    const observer = useRef()
    const observerElementRef = useCallback(element => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMorePosts && !isNetworkUnsupported && !isFetching) setPage(prev => prev + 1)
        })
        if (element) observer.current.observe(element)
    }, [hasMorePosts, isNetworkUnsupported, isFetching, setPage])

    return (
        <div className="timeline-wrapper" onClick={() => {if (isLogoutVisible)setIsLogoutVisible(false)}}>
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
                            { posts?.length ? <h1 className="main-heading">Feed</h1> : null }
                            { posts?.length ? posts.map(post => <PostCard key={uuidv4()} post={post} />) : null }
                            {
                                isFetching && 
                                <div className="loading">
                                    <div className="loading-spinner"></div>
                                </div>
                            }
                            <div ref={observerElementRef} className="amount">{!hasMorePosts && 'The End'}</div>
                        </div>
                    </main>
                }

                <aside className={!loggedInWallet.active ? 'timeline-right' : !isLogoutVisible ? 'timeline-right' : 'timeline-right logout'}>
                    <div className={!loggedInWallet.active ? 'timeline-right-inner' : !isLogoutVisible ? 'timeline-right-inner' : 'timeline-right-inner logout-inner'}>
                        <button 
                            className={"btn btn-big " + (!loggedInWallet.active ? 'btn-blue' : isLogoutVisible ? 'btn-blue user-btn' : 'btn-white' )}
                            onClick={() => loggedInWallet.active ? setIsLogoutVisible(prev => !prev) : navigate('/login')}
                        >
                            {loggedInWallet.active ? loggedInWallet.ensName ? loggedInWallet.ensName : loggedInWallet.shortAddress : 'Login'}
                        </button>
                        {isLogoutVisible && <button className="logout-btn btn btn-blue btn-big" onClick={() => handleLogout()}>Logout</button>}
                    </div>
                </aside>

            </div>
            <div className="timeline-gradient-left"></div>
            <div className="timeline-gradient-right"></div>
        </div>
    )
}

export default Timeline