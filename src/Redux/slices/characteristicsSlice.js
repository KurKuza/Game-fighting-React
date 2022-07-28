import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	power: 1,
	dexterity: 5,
	intelligence: 1,
	charisma: 1,
}
// Персонаж
// power- здоровье 
// dexterity- скорость и поле атаки
// intelligence- прыжок
// charisma- контрастность изображения

export const characteristicsSlice = createSlice({
	name: 'characteristics',
	initialState,
	reducers: {
		//power
		incrementPower: (state) => {
			state.power += 5
		},
		decrementPower: (state) => {
			state.power -= 5
		},
		//dexterity
		incrementDexterity: (state) => {
			state.dexterity += 1
		},
		decrementDexterity: (state) => {
			state.dexterity -= 1
		},
		//intelligence
		incrementIntelligence: (state) => {
			state.intelligence += 1
		},
		decrementIntelligence: (state) => {
			state.intelligence -= 1
		},
		//charisma
		incrementCharisma: (state) => {
			state.charisma += 4
		},
		decrementCharisma: (state) => {
			state.charisma -= 4
		},
	},
})

export const { incrementPower, decrementPower, incrementDexterity, decrementDexterity, incrementIntelligence, decrementIntelligence, incrementCharisma, decrementCharisma } = characteristicsSlice.actions

export default characteristicsSlice.reducer