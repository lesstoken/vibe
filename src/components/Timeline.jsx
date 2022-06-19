import React from 'react'
import {useWeb3React} from '@web3-react/core'
import {Link} from 'react-router-dom';

function Timeline() {
    const wallet = useWeb3React();
    // connector, library, chainId, account, activate, deactivate, active, error
    const { account } = wallet;

    return (
        <div>
            <p>{account}</p>
            <Link to="/">Back</Link>
        </div>
    )
}

export default Timeline