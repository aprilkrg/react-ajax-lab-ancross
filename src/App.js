import { useEffect, useState } from 'react'
import axios from 'axios';
import ScrollToTop from 'react-scroll-to-top';
import './App.css';
import DisplayCards from './components/DisplayCards.js'

export default function App() {
    // STATE
    const [data, setData] = useState({ villagers: []})
    const [search, setSearch] = useState("")
    const [faves, setFaves] = useState([])
    const [filtered, setFiltered] = useState([])
    const [personalities, setsPersonalities] = useState({
        cranky: [],
        jock: [],
        lazy: [],
        normal: [],
        peppy: [],
        smug: [],
        snooty: [],
        uchi: []
    })
    // LIFECYCLE
    useEffect(() => {
        try {
            async function fetchData() {
                const response = await axios.get('http://acnhapi.com/v1/villagers/')
                setData({ villagers: Object.values(response.data) })
            }
            fetchData()
            async function sortByPersonality() {
                const stateObj = {
                    cranky: [],
                    jock: [],
                    lazy: [],
                    normal: [],
                    peppy: [],
                    smug: [],
                    snooty: [],
                    uchi: []
                }
                await data.villagers.map(villager => {
                    if (villager.personality === "Cranky") {
                        stateObj.cranky.push(villager)
                    }
                    else if (villager.personality === "Jock") {
                        stateObj.jock.push(villager)
                    }
                    else if (villager.personality === "Lazy") {
                        stateObj.lazy.push(villager)
                    }
                    else if (villager.personality === "Normal") {
                        stateObj.normal.push(villager)
                    }
                    else if (villager.personality === "Peppy") {
                        stateObj.peppy.push(villager)
                    }
                    else if (villager.personality === "Smug") {
                        stateObj.smug.push(villager)
                    }
                    else if (villager.personality === "Snooty") {
                        stateObj.snooty.push(villager)
                    }
                    else if (villager.personality === "Uchi") {
                        stateObj.uchi.push(villager)
                    }
                })
                setsPersonalities({ 
                    cranky: [...stateObj.cranky],
                    jock: [...stateObj.jock],
                    lazy: [...stateObj.lazy],
                    normal: [...stateObj.normal],
                    peppy: [...stateObj.peppy],
                    smug: [...stateObj.smug],
                    snooty: [...stateObj.snooty],
                    uchi: [...stateObj.uchi],
                })
            }
            sortByPersonality()
        } catch (err) {
            console.warn(err)
        }
    }, [])

    // FUNCTIONS
    const filteredVillagers = data.villagers.filter(villager => {
        const loweredName = villager.name["name-USen"].toLowerCase()
        return loweredName.includes(search.toLowerCase())
    })
    
    const handleChange = (e) => {
        setSearch(e.target.value)
        // const filteredData = filteredVillagers
        // setFiltered([...filteredData])
        // const filteredVillagers = data.villagers.filter(villager => {
        //     const loweredName = villager.name["name-USen"].toLowerCase()
        //     return loweredName.includes(search.toLowerCase())
        // })
        // setFiltered([...filteredVillagers])
    }

    const handleClick = (villager) => {
        console.log(villager)
        if (!faves.includes(villager)) {
            // if faves doesn't include villager, add it
            setFaves([...faves, villager])
        } else {
            // if faves includes villager, remove and set state
            const villagerIndex = faves.indexOf(villager)
            const favesState = [...faves]
            favesState.splice(villagerIndex, 1)
            setFaves(favesState)
        }
    }

    const handleBtnClick = (type) => {
        console.log(type)
        // on btn click, change the filtered villagers in state from filtered by name sub string to personalities state arr
        // console.log(personalities[type])
        setFiltered([...personalities[type]])
    }


    return (
        <>
            <div className="App">
                <h1>Animal Crossing Villager Search</h1>
                <div>
                    <label htmlFor="villager-search">Search for a villager: </label>
                    <input
                        id="villager-search"
                        type="text"
                        placeholder="filter by villagers name"
                        value={search}
                        onChange={handleChange}
                    />
                </div>
                <p>Filter by personality type: 
                    <button onClick={() => {handleBtnClick("cranky")}}>Crankies</button>
                    <button onClick={() => {handleBtnClick("jock")}}>Jocks</button>
                    <button onClick={() => {handleBtnClick("lazy")}}>Lazys</button>
                    <button onClick={() => {handleBtnClick("normal")}}>Normals</button>
                    <button onClick={() => {handleBtnClick("peppy")}}>Peppys</button>
                    <button onClick={() => {handleBtnClick("snooty")}}>Snooties</button>
                    <button onClick={() => {handleBtnClick("uchi")}}>Sisterlies</button>
                </p>
            </div>
            <div className="cards">
                <DisplayCards
                    title={"all-villagers"}
                    color={"rgba(98, 239, 244, .5)"}
                    villagers={data.villagers}
                    handleClick={null}
                />
                <DisplayCards
                    title={"filtered-villagers"}
                    color={"rgba(133, 255, 171, .5"}
                    villagers={filteredVillagers}
                    handleClick={handleClick}
                />
                <DisplayCards
                    title={"favorite-villagers"}
                    color={"rgba(255, 243, 102, .5)"}
                    villagers={faves}
                    handleClick={handleClick}
                />
            </div>
            <ScrollToTop smooth />
        </>
    )
}