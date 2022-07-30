import React from 'react'
import styles from './Health.module.scss'
import { useSelector } from 'react-redux'

function Health() {
	const { power, name } = useSelector(
		(state) => state.characteristics,
	)

	return (
		<>
			{/* Player health */}
			<div className={styles.health} style={{}}>
				<div className={styles.containerHelth}>
					<div
						style={{
							backgroundColor: '#85647e',
							height: 30,
							width: '100%',
						}}></div>
					<div
						id='playerHealth'
						className={styles.playerHealth}
						style={{
							width: power + 100 + '%',
						}}></div>
				</div>
				<div className={styles.name}>{name}</div>
			</div>
			{/* Enemy health */}
			<div className={styles.health} style={{ right: 0 }}>
				<div className={styles.containerHelth}>
					<div
						style={{
							backgroundColor: '#2a2a52',
							height: 30,
							width: '100%',
						}}></div>
					<div id='enemyHealth' className={styles.enemyHealth}></div>
				</div>
			</div>
		</>
	)
}

export default Health
