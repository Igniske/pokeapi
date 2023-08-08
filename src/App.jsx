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
  let skills = info.abilities.map((skill,index) => <div className='flex flex-col border-2 border-black' key={index}><div className='flex flex-row'><h2>{skill.ability.name}</h2></div><p className={abilitiesHidden ? "hidden" : ""}>{abilitiesDesc[index]}</p></div>)
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
      {(info === null ? "" : <div className={`flex flex-col flex-wrap h-full w-1/4 m-auto border-4 ${borderClass}`}>
        <div className='flex flex-row py-4 text-xl m-auto'>
          <div>{firstCharToUpperCase(info.name)} #{info.id}</div>
        </div>
        <div className='m-auto pb-4'>
          <div className='text-center'>Type:</div> 
          {(info.types.length > 1 ? <div className='flex flex-row'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-l-lg text-center bg-' + borderColor(info.types[0].type.name)}>{upperCaseType(info.types[0].type.name)}</div><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-r-lg text-center bg-' + borderColor(info.types[1].type.name)}>{upperCaseType(info.types[1].type.name)}</div></div> : <div className='flex flex-row'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-lg text-center bg-' + borderColor(info.types[0].type.name)}>{upperCaseType(info.types[0].type.name)}</div></div>)}
        </div>
        <div className='flex flex-row space-x-8 m-auto'>
          <button className='bg-stone-200 h-12 w-12 rounded-full border-2 border-black' onClick={handleShiny}><img src={Shiny} /></button>
          <button className='bg-stone-600 h-12 w-12 rounded-full border-2 border-black' onClick={handleBack}><img src={ChangeSide} /></button>
          <button className='bg-stone-400 h-12 w-12 rounded-full border-2 border-black' onClick={handleRandomPokemon}><img src={Randomize} /></button>
        </div>
        <img className='h-64 w-64' src={fromBack ? (isShiny ? info.sprites.back_shiny : info.sprites.back_default) : (isShiny ? info.sprites.front_shiny : info.sprites.front_default)} />
        <ul className='h-fit w-fit border-2 border-stone-300'>
          <li>Hp: {info.stats[0].base_stat}</li>
          <li>Attack: {info.stats[1].base_stat}</li>
          <li>Defense: {info.stats[2].base_stat}</li>
          <li>Special Atk: {info.stats[3].base_stat}</li>
          <li>Special Def: {info.stats[4].base_stat}</li>
          <li>Speed: {info.stats[5].base_stat}</li>
        </ul>
        <div className='flex flex-row'>
          <div>Abilities:</div>
          <button className='bg-orange-500 h-16 w-16' onClick={handleAbilityHidden}/>
        </div>
        
        {abilitiesArray()}
      </div>)}
      <GenerationX number={1} firstNum={1} secondNum={151} handleShow={handleShow}/>
      <GenerationX number={2} firstNum={152} secondNum={251} handleShow={handleShow}/>
    </>
  )
}

export default App
