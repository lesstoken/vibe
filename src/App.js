import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Timeline from "./components/Timeline";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Timeline />} />
			</Routes>
		</div>
	)
}

export default App
