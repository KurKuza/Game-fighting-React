
import { useRef } from 'react'
import styles from './Game.module.scss'

import Health from './Health/Health'
import { useLogickGame } from './useLogickGame'

function Game() {
	const canvasRef = useRef(null)
	useLogickGame(canvasRef)

	return (
		<div className={styles.container}>
			<div className={styles.canvasContainer}>
				<Health />
				<canvas ref={canvasRef} />
			</div>
		</div>
	)
}
export default Game