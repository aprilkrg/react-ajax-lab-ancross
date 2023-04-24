import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css';
import DisplayCards from './components/DisplayCards.js'

export default function App() {
	// STATE
	const [data, setData] = useState({ villagers: [] })
	const [search, setSearch] = useState("")
	const [faves, setFaves] = useState([])

	// LIFECYCLE
	useEffect(() => {
		try {
			async function fetchData() {

				const response = await axios.get('http://acnhapi.com/v1/villagers/')
				// console.log("VILLAGERS:", response.data) // obj of objs
				// Object.values() turns data into arr of objs
				// console.log("OBJECTS:", Object.values(response.data))
				// set state
				setData({ villagers: Object.values(response.data) })
			}
			fetchData()
		} catch (err) {
			console.warn(err)
		}
	}, [])

	// FUNCTIONS
	// const villagerList = data.villagers.map((villager) => {
	// 	return <li>{villager.name["name-USen"]}</li>
	// })
	const handleChange = (e) => {
		setSearch(e.target.value)
	}

	const filteredVillagers = data.villagers.filter(villager => {
		const loweredName = villager.name["name-USen"].toLowerCase()
		return loweredName.includes(search.toLowerCase())
	})

	const handleClick = (villager) => {
		console.log(villager)
		if(!faves.includes(villager)) {
			// if faves doesn't include villager, add it
			setFaves([...faves, villager])
		} else {
			// if faves includes villager, remove and set state
			const villagerIndex = faves.indexOf(villager)
			const favesState = [...faves]
			favesState.splice(villagerIndex, 1)
			// console.log(favesState)
			setFaves(favesState)
		}
	}

	return (
		<>
			<h1>Animal Crossing Villager Search</h1>
			<div>
				<label htmlFor="villager-search">Search for a villager:</label>
				<input
					id="villager-search"
					type="text"
					placeholder="filter by villagers name"
					value={search}
					onChange={handleChange}
				/>
			</div>
			{/* {villagerList} */}
			<div
				style={{
					display:"flex"
				}}
			>
				{/* <DisplayCards
					villagers={data.villagers}
					color={"blue"}
				/> */}
				<DisplayCards
					villagers={filteredVillagers}
					color={"red"}
					handleClick={handleClick}
				/>
				<DisplayCards
					villagers={faves}
					color={"yellow"}
					handleClick={handleClick}
				/>
			</div>
		</>
	)
}