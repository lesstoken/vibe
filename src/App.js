import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Timeline from "./components/Timeline";
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'


function App() {
	function getLibrary(provider, connector) {
		return new ethers.providers.Web3Provider(provider)
	}

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/timeline" element={<Timeline />} />
				</Routes>
			</Router>
		</Web3ReactProvider>
	)
}

export default App
