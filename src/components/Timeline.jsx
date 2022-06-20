import React, {useState} from 'react'
import {useWeb3React} from '@web3-react/core'
import { ethers, BigNumber } from 'ethers'
// import ropstenABI from '../abis/ropstenABI.json'
import rinkebyABI from '../abis/rinkebyABI.json'
import {useEffect} from 'react';
import blueLogo from '../assets/images/logo-blue.svg'

function Timeline() {
    const { library, chainId } = useWeb3React();
    const [isNetworkUnsupported, setIsNetworkUnsupported] = useState(true)
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        if (chainId === 3 || chainId === 4 || chainId === undefined) setIsNetworkUnsupported(false)
    }, [chainId])

    useEffect(() => {
        if (isNetworkUnsupported) return
        async function fetchPosts() {
            let provider = library || new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/ff087ba9578e4e0995028c853425a591')
            const contract = new ethers.Contract('0x9120b19e921fAf41d315B528dE711f99cf530725', rinkebyABI, provider)
            const latestPostID =  await contract.getLatestPostID()
            const num = latestPostID.sub(4)
            const posts = await contract.fetchPostsRanged(num, 5)
            setPosts(posts)
            console.log(posts)
        }
        fetchPosts()
    }, [library, isNetworkUnsupported])

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
                    isNetworkUnsupported && 
                    <div className="network-wrapper">
                        <div className="network-inner-wrapper">
                            <h1 className="network-title">This app supports ETH. You are currently connected to an unsupported network.</h1>
                            <button className="btn btn-blue btn-big">Switch to Ethereum</button>
                            <h2 className="network-subtitle">You may need to manually switch network via your wallet.</h2>
                        </div>
                    </div>
                }
                <aside className="timeline-right">
                    <div className="timeline-right-inner">
                        <button className="btn btn-blue btn-big">3327.eth</button>
                    </div>
                </aside>
            </div>
            <div className="timeline-gradient-left"></div>
            <div className="timeline-gradient-right"></div>
        </div>
    )
}

export default Timeline