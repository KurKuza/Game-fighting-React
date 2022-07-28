import React from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'

import Canvas from './Pages/Canvas/Canvas'
import Home from './Pages/Home/Home'
import Character from './Pages/Сharacter/Сharacter'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/character' element={<Character />} />
				<Route path='/game' element={<Canvas />} />
			</Routes>
		</div>
	)
}

export default App
