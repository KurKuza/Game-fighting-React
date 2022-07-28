import React from 'react'
import styles from './Image.module.scss'
import { useSelector } from 'react-redux'
import character from '../../img/Character.jpg'

function Image() {
	const { charisma } = useSelector((state) => state.characteristics)

	return (
		<div className={styles.imageBlock}>
			<img
				className={styles.image}
				src={character}
				style={{
					filter: `contrast(${100 + charisma}%)`,
				}}
				alt='character'
			/>
			<div
				className={styles.imageShadow}
				style={{
					backgroundImage: `url(${character})`,
				}}></div>
		</div>
	)
}

export default Image
