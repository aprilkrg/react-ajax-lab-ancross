import { useEffect, useState } from 'react'
import axios from 'axios';
import ScrollToTop from 'react-scroll-to-top';
import './App.css';
import DisplayCards from './components/DisplayCards.js'

export default function App() {
  // STATE
  const [data, setData] = useState({ villagers: [] })
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
  const [activeBtn, setActiveBtn] = useState("")

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
    setActiveBtn("")
    setSearch(e.target.value)
  }

  const handleClick = (villager) => {
    console.log("handleclick", villager, "\nstate fave", faves)
    if (!faves.includes(villager)) {
      console.log("add to faves")
      // if faves doesn't include villager, add it
      setFaves([...faves, villager])
    } else {
      console.log("remove from fave")
      // if faves includes villager, remove and set state
      const villagerIndex = faves.indexOf(villager)
      const favesState = [...faves]
      favesState.splice(villagerIndex, 1)
      setFaves(favesState)
    }
  }



  const handleBtnClick = (type) => {
    setSearch("")
    if (type === "all") {
      setFiltered([])
      setActiveBtn("all")
    } else {
      setFiltered([...personalities[type]])
      setActiveBtn(type)
    }
  }

  const handleClear = () => {
    setFaves([])
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
            placeholder="enter villager name"
            value={search}
            onChange={handleChange}
          />
        </div>
        <p>Filter by personality type:
          <button className={activeBtn === "all" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("all") }}>All</button>
          <button className={activeBtn === "cranky" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("cranky") }}>Crankies</button>
          <button className={activeBtn === "jock" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("jock") }}>Jocks</button>
          <button className={activeBtn === "lazy" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("lazy") }}>Lazys</button>
          <button className={activeBtn === "normal" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("normal") }}>Normals</button>
          <button className={activeBtn === "peppy" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("peppy") }}>Peppys</button>
          <button className={activeBtn === "snooty" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("snooty") }}>Snooties</button>
          <button className={activeBtn === "uchi" ? "filtered btn" : "btn"} onClick={() => { handleBtnClick("uchi") }}>Sisterlies</button>
        </p>
      </div>
      <div className="cards">
        <DisplayCards
          title={"All Villagers"}
          color={"rgba(98, 239, 244, .5)"}
          villagers={data.villagers}
          handleClick={() => console.log("clicked")}
        />
        <DisplayCards
          title={"Filtered Villagers"}
          color={"rgba(133, 255, 171, .5)"}
          villagers={filtered.length ? filtered : filteredVillagers}
          handleClick={handleClick}
        />
        <DisplayCards
          title={"Favorite Villagers"}
          color={"rgba(255, 243, 102, .5)"}
          villagers={faves}
          handleClick={handleClick}
          handleClear={handleClear}
        />
      </div>
      <ScrollToTop smooth />
    </>
  )
}