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
    const [personalities, setPersonalities] = useState({
        cranky: [],
        jock: [],
        lazy: [],
        normal: [],
        peppy: [],
        smug: [],
        snooty: [],
        uchi: []
    })
    const [activeBtn, setActiveBtn] = useState({
      isActive: false,
      id: null
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
                await data.villagers.forEach(villager => {
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
                setPersonalities({ 
                    cranky: stateObj.cranky,
                    jock: stateObj.jock,
                    lazy: stateObj.lazy,
                    normal: stateObj.normal,
                    peppy: stateObj.peppy,
                    smug: stateObj.smug,
                    snooty: stateObj.snooty,
                    uchi: stateObj.uchi,
                })
            }
            sortByPersonality()
        } catch (err) {
            console.warn(err)
        }
    }, [data.villagers])

    // FUNCTIONS
    const filteredVillagers = data.villagers.filter(villager => {
        const loweredName = villager.name["name-USen"].toLowerCase()
        return loweredName.includes(search.toLowerCase())
    })
    
    const handleChange = (e) => {
        setFiltered([])
        setSearch(e.target.value)
    }

    const handleClick = (villager) => {
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
        if(type === "all") {
            setFiltered([])
        } else {
            setFiltered([...personalities[type]])
        }
        setActiveBtn({
          isActive: true,
          id: type
        })
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
                    <button id={"all"} className={activeBtn.isActive && activeBtn.id === "all" ? "filtered" : ""} onClick={() => {handleBtnClick("all")}}>All</button>
                    <button id={"cranky"} className={activeBtn.isActive && activeBtn.id === "cranky" ? "filtered" : ""} onClick={() => {handleBtnClick("cranky")}}>Crankies</button>
                    <button id={"jock"} className={activeBtn.isActive && activeBtn.id === "jock" ? "filtered" : ""} onClick={() => {handleBtnClick("jock")}}>Jocks</button>
                    <button id={"lazy"} className={activeBtn.isActive && activeBtn.id === "lazy" ? "filtered" : ""} onClick={() => {handleBtnClick("lazy")}}>Lazys</button>
                    <button id={"normal"} className={activeBtn.isActive && activeBtn.id === "normal" ? "filtered" : ""} onClick={() => {handleBtnClick("normal")}}>Normals</button>
                    <button id={"peppy"} className={activeBtn.isActive && activeBtn.id === "peppy" ? "filtered" : ""} onClick={() => {handleBtnClick("peppy")}}>Peppys</button>
                    <button id={"snooty"} className={activeBtn.isActive && activeBtn.id === "snooty" ? "filtered" : ""} onClick={() => {handleBtnClick("snooty")}}>Snooties</button>
                    <button id={"uchi"} className={activeBtn.isActive && activeBtn.id === "uchi" ? "filtered" : ""} onClick={() => {handleBtnClick("uchi")}}>Sisterlies</button>
                </p>
            </div>
            <div className="cards">
                <DisplayCards
                    title={"all-villagers"}
                    color={"rgba(98, 239, 244, .5)"}
                    villagers={data.villagers}
                    handleClick={()=> console.log("clicked")}
                />
                <DisplayCards
                    title={"filtered-villagers"}
                    color={"rgba(133, 255, 171, .5)"}
                    villagers={filtered.length ? filtered : filteredVillagers}
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