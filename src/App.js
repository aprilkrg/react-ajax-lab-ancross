import {
  useEffect,
  useState
} from 'react'
import DisplayCards from './DisplayCards'
import axios from 'axios'
import './App.css';

function App() {
  const [data, setData] = useState({ villagers: [] })
  const [search, setSearch] = useState('')
  const [faves, setFaves] = useState([])

  useEffect(() => {
    // to avoid asycning the useEffect's cb, we will define a async function within the useEffect's cb
    // Immediately invoked function expression
    // IIFE (ifies) 
    // you can use a named function too
    (async () => {
      try {
        const response = await axios.get('http://acnhapi.com/v1/villagers/')
        // console.log(response.data)
        // const villagerArray = Object.values(response.data)
        // console.log(villagerArray)
        setData({ villagers: Object.values(response.data) })
      } catch(err) {
        console.warn(err)
      }
    })() // immediately invoked
  }, [])

  const handleChange = e => setSearch(e.target.value)

  const handleClick = villager =>  {
    // make sure the villager is not in the faves array
    if (!faves.includes(villager)) {
      setFaves([...faves, villager])
    } else {
      // find the villager's index in the faves state
      const villagerIndex = faves.indexOf(villager)
      // make a copy of the faves array, so we can mutate it
      const favesCopy = [...faves]
      // splice the villager out and setState
      console.log(villagerIndex, favesCopy)
      setFaves(favesCopy.splice(villagerIndex, 1))
    }
  }

  // const getFilteredVillagers = () => {
  //   const searchTerm = search.toLowerCase()
  //   return data.villagers.filter(villager => {
  //     const lowerCaseName = villager.name['name-USen'].toLowerCase()
  //     return lowerCaseName.includes(searchTerm)
  //   })
  // }

  // this all runs each time we re render
  const searchTerm = search.toLowerCase()
  const filteredVillagers = data.villagers.filter(villager => {
    const lowerCaseName = villager.name['name-USen'].toLowerCase()
    return lowerCaseName.includes(searchTerm)
  })

  return (
    <div>
      <label htmlFor='villager-search'>Search for a Villager:</label>
      <input 
        id='villager-search'
        type='text'
        value={search}
        onChange={handleChange}
      />


        <div style={{ display: 'flex' }}>
          <div>
            <h1>Villagers:</h1>

            <DisplayCards 
              villagers={filteredVillagers}
              handleClick={handleClick}
            />
          </div>

          <div>
            <h1>Favorites:</h1>

            <DisplayCards 
              villagers={faves}
              handleClick={handleClick}
            />
          </div>
      </div>
    </div>
  );
}

export default App;
