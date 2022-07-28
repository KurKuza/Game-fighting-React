import React from 'react'
import styles from './Character.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import character from '../../img/Character.jpg'
import { setName } from '../../Redux/slices/characteristicsSlice'

function Image() {
	const { charisma, name } = useSelector((state) => state.characteristics)
	const dispatch = useDispatch()

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
			<input
				className={styles.input}
				onInput={(val) => dispatch(setName(val.target.value))}
				value={name}
			/>
		</div>
	)
}

export default Image
