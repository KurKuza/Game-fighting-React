import React from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/Home'
import CharacterPage from './Pages/СharacterPage/СharacterPage'
import Game from './Pages/Game/Game'

function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/character' element={<CharacterPage />} />
				<Route path='/game' element={<Game />} />
			</Routes>
		</div>
	)
}

export default App
