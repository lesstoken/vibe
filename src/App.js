import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Timeline from "./components/Timeline";
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import { WalletProvider } from './contexts/WalletContext'

function App() {
	function getLibrary(provider, connector) {
		const library = new ethers.providers.Web3Provider(provider)
		library.pollingInterval = 8000
		return library
	}

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<WalletProvider>
				<Router basename="/">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Timeline />} />
					</Routes>
				</Router>
			</WalletProvider>
		</Web3ReactProvider>
	)
}

export default App
