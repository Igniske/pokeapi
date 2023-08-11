import { useState, useEffect } from 'react'
import './App.css'
import GenerationX from './components/GenerationX';
import Navbar from './components/Navbar';
import Shiny from './assets/icons/shinyico.png'
import ChangeSide from "./assets/icons/changeico.jpeg"
import Randomize from "./assets/icons/randomico.png"
import ColorTest from './components/ColorTest';

function App() {

  const [randomPokemon, setRandomPokemom] = useState(Math.round(Math.random() * 1000))
  const [info, setInfo] = useState(null);
  const [abilitiesDesc, setAbilitiesDesc] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const POKEAPI = "https://pokeapi.co/api/v2/";
  const prefix = "pokemon/";
  const [pokemon, setPokemon] = useState(randomPokemon);
  const [searchError, setSearchError] = useState(false);
  const [isShiny, setIsShiny] = useState(false);
  const [fromBack, setFromBack] = useState(false);
  const [abilitiesHidden, setAbilitiesHidden] = useState(false);
  
  useEffect(() => {
    let search = fetch(POKEAPI + prefix + pokemon)
      .then((response) => {
        if (!response.ok) {
          setSearchError(true);
          throw new Error("Pokemon not found");
        }
       return response.json()})   
      .then((data) => {
        setSearchError(false);
        setInfo(data);
        let abilitiesUrl = data.abilities.map((skill) => skill.ability.url);
        return Promise.all(abilitiesUrl.map(url => fetch(url).then(response => response.json())));
      })
      .then((abilitiesData) => setAbilitiesDesc(abilitiesData.map((desc) => desc.effect_entries[1].effect)))
      .catch((error) => console.log(error));
  }, [pokemon, searchError]);

function abilitiesArray(){
  let skills = info.abilities.map((skill,index) => <div className={'flex flex-col border-2 border-black ' + (abilitiesHidden ? "border-y-0" : "border-t-0")} key={index}><div className='flex flex-row'><h2 className='border-b-2 border-b-black w-full text-center'>{replaceSymbol(firstCharToUpperCase(skill.ability.name))}</h2></div><div className='bg-white'><p className={abilitiesHidden ? "hidden" : ""}>{abilitiesDesc[index]}</p></div></div>)
  return skills
}

function borderColor(type){
  switch(type){
      case "bug": 
      return "lime-400";
      case "dark":
      return "stone-900";
      case "dragon":
      return "violet-700"
      case "electric":
      return "yellow-400"
      case "fairy":
      return "pink-300"
      case "fighting":
      return "orange-900"
      case "fire":
      return "orange-500"
      case "flying":
      return "indigo-400"
      case "ghost":
      return "indigo-900"
      case "grass":
      return "lime-600"
      case "ground":
      return "amber-300"
      case "ice":
      return "teal-200"
      case "normal":
      return "neutral-300"
      case "poison":
      return "purple-800"
      case "psychic":
      return "rose-500"
      case "rock":
      return "yellow-700"
      case "steel":
      return "zinc-500"
      case "water":
      return "sky-700"
  }
}

const upperCaseType = (type) =>{
  return type.toUpperCase();
}

function handleShow(value){
  setPokemon(value)
}

const handleInputChange = (event) =>{
  setInputValue(event.target.value);
}

const handleAbilityHidden = (event) =>{
  event.preventDefault();
  setAbilitiesHidden(!abilitiesHidden);
}

const handleShiny = (event) =>{
  event.preventDefault()
  setIsShiny(!isShiny)
}

const handleBack = (event) =>{
  event.preventDefault()
  setFromBack(!fromBack)
}

const handleSubmit = (event) =>{
  if(inputValue === "")
  {
    return ""
  }
  event.preventDefault()
  setPokemon(inputValue)
}

const handleRandomPokemon = (event) =>{
  event.preventDefault()
  let randomValue = Math.round(Math.random() * 1000);
  setPokemon(randomValue);
}

const firstCharToUpperCase = (str) =>{
  let name = str.split("")
  name[0] = name[0].toUpperCase()
  return name.join("")
}

const replaceSymbol = (str) =>{
  let name = str.split("")
  return name.map((char) =>{
    if(char === "-"){
      char = " "
    }
    return char;
  }).join("")
}


if(info === null){
  return (
    <div>
      <p>Loading, please wait!</p>
    </div>
  )
}



const borderClass = info.types.length > 1
  ? `border-y-${borderColor(info.types[0].type.name)} border-x-${borderColor(info.types[1].type.name)}`
  : `border-${borderColor(info.types[0].type.name)}`;

  return (
    <>
      <Navbar></Navbar>
      <ColorTest></ColorTest>
      <div className='flex flex-row m-auto'>
        
        <div className='m-auto py-16'>
          <input className='border-4 border-black h-8 w-36' value={inputValue} onChange={handleInputChange}/>
          <button onClick={handleSubmit} className='bg-gray-500 h-8 w-24'>Search!</button>
          <div className={searchError ? "" : "hidden"}>Pokemon not found!</div>
        </div>
      </div>
      {(info === null ? "" : <div className={`h-full w-1/4 m-auto bg-red-600 border-2 border-black`}>
        <div className={`flex flex-col flex-wrap border-4 ${borderClass}`}>
        <div className='flex flex-row h-24'>
          <div className='border-2 rounded-full mt-4 ml-4 h-14 w-14 border-black'>
            <div className='border-4 rounded-full h-full border-gray-300' >
              <div className='border-2 rounded-full h-full border-black'>
                <div className='rounded-full h-full bg-blue-500'>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 rounded-full mt-4 ml-4 h-8 w-8 border-black'>
            <div className='border-2 rounded-full h-full border-gray-300' >
              <div className='border-2 rounded-full h-full border-black'>
                <div className='rounded-full h-full bg-green-500'>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 rounded-full mt-4 ml-4 h-8 w-8 border-black'>
            <div className='border-2 rounded-full h-full border-gray-300' >
              <div className='border-2 rounded-full h-full border-black'>
                <div className='rounded-full h-full bg-red-800'>
                </div>
              </div>
            </div>
          </div>
          <div className='border-2 rounded-full mt-4 ml-4 h-8 w-8 border-black'>
            <div className='border-2 rounded-full h-full border-gray-300' >
              <div className='border-2 rounded-full h-full border-black'>
                <div className='rounded-full h-full bg-yellow-500'>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row pb-4 text-xl m-auto'>
          <div className='border-2 w-64 text-center border-black'>
            <div className='border-4 border-stone-400'>
              <div className='border-2 border-black bg-white'>
                {firstCharToUpperCase(info.name)} #{info.id}
              </div>
            </div>
          </div>
        </div>
        <div className='m-auto pb-4'>
          
          {(info.types.length > 1 ? <div className='flex flex-row'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-l-lg text-center bg-' + borderColor(info.types[0].type.name)}>{upperCaseType(info.types[0].type.name)}</div><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-r-lg text-center bg-' + borderColor(info.types[1].type.name)}>{upperCaseType(info.types[1].type.name)}</div></div> : <div className='flex flex-row'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-lg text-center bg-' + borderColor(info.types[0].type.name)}>{upperCaseType(info.types[0].type.name)}</div></div>)}
        </div>
        <div className='py-4 m-auto'>
          <div className='flex flex-row space-x-8 m-auto'>
            <button className={'h-12 w-12 rounded-full border-2 border-black ' + (isShiny ? "bg-blue-600" : "bg-white")} onClick={handleShiny}><img src={Shiny} /></button>
            <button className={'h-12 w-12 rounded-full border-2 border-black ' + (fromBack ? "bg-blue-600" : "bg-white")} onClick={handleBack}><img src={ChangeSide} /></button>
            <button className='bg-white h-12 w-12 rounded-full border-2 border-black' onClick={handleRandomPokemon}><img src={Randomize} /></button>
          </div>
        </div>
        <div className='m-auto border-2 rounded-sm border-black'>
          <div className='border-8 border-stone-400'>
            <div className={`border-2 border-black background-${info.types[0].type.name}`}>
              <img className='h-64 w-64' src={fromBack ? (isShiny ? info.sprites.back_shiny : info.sprites.back_default) : (isShiny ? info.sprites.front_shiny : info.sprites.front_default)} />
            </div>
          </div>
        </div>
        <div className='my-4 h-48 '>
          
          <ul className='h-fit w-1/2 m-auto bg-stone-900 text-justified'>
            <div className='border-2 border-black'>
            <div className='border-4 border-stone-400'>
              <li className='w-full flex flex-row border-2 border-b-black  border-black'><div className='w-3/5 text-white'>Hp:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[0].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Attack:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[1].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Defense:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[2].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Sp Atk:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[3].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Sp Def:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[4].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Speed:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[5].base_stat}</div></li>
              <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Total:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{info.stats[0].base_stat + info.stats[1].base_stat + info.stats[2].base_stat + info.stats[3].base_stat + info.stats[4].base_stat + info.stats[5].base_stat}</div></li>
            </div>
            </div>
          </ul>
          
        </div>
        <div className='flex flex-row w-full border-2 border-black'>
          <button className='h-full w-full bg-stone-400' onClick={handleAbilityHidden}>Abilities:</button>
        </div>
        
        {abilitiesArray()}
        </div>
      </div>
      
      )}
      <GenerationX borderColor={borderColor} allUpper={upperCaseType} toUpper={firstCharToUpperCase} Shiny={Shiny} name={"Kanto"} number={1} firstNum={1} secondNum={151} handleShow={handleShow}/>
      <GenerationX borderColor={borderColor} allUpper={upperCaseType} toUpper={firstCharToUpperCase} Shiny={Shiny} name={"Johto"} number={2} firstNum={152} secondNum={251} handleShow={handleShow}/>
    </>
  )
}

export default App
