import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

function Home() {
	return (
		<div className={styles.homeContainer}>
			<div className={styles.homeBox}>
				<div>
					<Link to='/character' className={styles.goGame}>
						Go game
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Home
