import React from 'react'
import styles from './Indicators.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'
import {
	incrementPower,
	decrementPower,
	incrementDexterity,
	decrementDexterity,
	incrementIntelligence,
	decrementIntelligence,
	incrementCharisma,
	decrementCharisma,
} from '../../Redux/slices/characteristicsSlice'

function Indicators() {
	const dispatch = useDispatch()
	const { power, dexterity, intelligence, charisma } = useSelector(
		(state) => state.characteristics,
	)
	const parameters = [
		{
			characteristic: 'Сила',
			number: `${power}`,
			actionMinus: () => dispatch(decrementPower()),
			actionPlus: () => dispatch(incrementPower()),
		},
		{
			characteristic: 'Ловкость',
			number: `${dexterity}`,
			actionMinus: () => dispatch(decrementDexterity()),
			actionPlus: () => dispatch(incrementDexterity()),
		},
		{
			characteristic: 'Интеллект',
			number: `${intelligence}`,
			actionMinus: () => dispatch(decrementIntelligence()),
			actionPlus: () => dispatch(incrementIntelligence()),
		},
		{
			characteristic: 'Харизма',
			number: `${charisma}`,
			actionMinus: () => dispatch(decrementCharisma()),
			actionPlus: () => dispatch(incrementCharisma()),
		},
	]

	return (
		<div className={styles.indicators}>
			{/* indicators */}
			{parameters.map((obj, key) => (
				<div className={styles.indicator} key={key}>
					<div className={styles.characteristic}>{obj.characteristic}</div>
					<div className={styles.counter}>
						<button
							disabled={Number(obj.number) === 0}
							onClick={obj.actionMinus}
							className={cn(styles.button, {
								// Если не активна- затемнить
								[`${styles.disabledButton}`]: Number(obj.number) === 0,
							})}>
							-
						</button>
						<div>{obj.number}</div>
						<button onClick={obj.actionPlus} className={styles.button}>
							+
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default Indicators
