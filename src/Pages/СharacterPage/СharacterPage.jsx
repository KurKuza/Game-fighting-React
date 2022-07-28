import React from 'react'
import styles from './Character.module.scss'
import { Link } from 'react-router-dom'

import Indicators from '../../components/Indicators/Indicators'
import Character from '../../components/Character/Character'

function CharacterPage() {
	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<div className={styles.сontent}>
					<Character/>
					<Indicators />
				</div>
					<Link to='/game' className={styles.goGame}>
						Play
					</Link>
			</div>
		</div>
	)
}

export default CharacterPage
