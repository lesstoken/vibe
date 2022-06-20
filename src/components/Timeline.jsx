import React from 'react'
import {useWeb3React} from '@web3-react/core'
import blueLogo from '../assets/images/logo-blue.svg'

function Timeline() {
    const wallet = useWeb3React();

    return (
        <div className="timeline-wrapper">
            <div className="timeline-inner-wrapper">
                <aside className="timeline-left">
                    <div className="timeline-left-inner">
                        <img src={blueLogo} alt="logo-blue" className="logo-blue" />
                        <button className="btn btn-blue btn-big">Write A Post</button>
                    </div>
                </aside>
                <div className="network-wrapper">
                    <div className="network-inner-wrapper">
                        <h1 className="network-title">This app supports ETH. You are currently connected to an unsupported network.</h1>
                        <button className="btn btn-blue btn-big">Switch to Ethereum</button>
                        <h2 className="network-subtitle">You may need to manually switch network via your wallet.</h2>
                    </div>
                </div>
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