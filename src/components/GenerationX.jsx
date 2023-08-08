import React from "react";
import { useState, useEffect } from "react";

function GenerationX({number, firstNum, secondNum, handleShow}){

    const [thisGenerationPokes, setThisGenerationPokes] = useState([])
    const [hideThisGen, setHideThisGen] = useState(false);

    useEffect(() =>{
        const fetchData = async (num, num2) =>{
            const fetchedData = [];
            for(let i = num; i <= num2; i++){
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
                const data = await response.json()
                const { name, id, stats, types, sprites } = data;
                fetchedData.push({ name, id, stats, types, sprites, "shiny" : false })
            }
            setThisGenerationPokes(fetchedData)
        }
        fetchData(firstNum, secondNum);
    },[])

    console.log(thisGenerationPokes)
    
    const pokemonRenders = () =>{
        return thisGenerationPokes.map((poke, index) =>(
             <div key={index} className="w-1/4 h-1/2 border-2 border-black">
                <div>{poke.name} #{poke.id}</div>
                <button className="h-16 w-16 bg-yellow-400" onClick={() => handleShow(poke.id)}/>
                <button className="h-16 w-16 bg-blue-500" onClick={()=> {
                    const updatedPokes = [...thisGenerationPokes];
                    updatedPokes[index].shiny = !updatedPokes[index].shiny; 
                    setThisGenerationPokes(updatedPokes); 
                    }}/>
                <div>Type: {(poke.types.length > 1 ? poke.types[0].type.name + " / " + poke.types[1].type.name : poke.types[0].type.name)}</div>
                <img src={(poke.shiny ? poke.sprites.front_shiny : poke.sprites.front_default)} className="h-16 w-16" />
                <ul className='h-fit w-fit border-2 border-stone-300'>
                    <li>Hp: {poke.stats[0].base_stat}</li>
                    <li>Attack: {poke.stats[1].base_stat}</li>
                    <li>Defense: {poke.stats[2].base_stat}</li>
                    <li>Special Atk: {poke.stats[3].base_stat}</li>
                    <li>Special Def: {poke.stats[4].base_stat}</li>
                    <li>Speed: {poke.stats[5].base_stat}</li>
                </ul>
            </div>
        ))
    }

    const handleHide = (event) =>{
        event.preventDefault();
        setHideThisGen(!hideThisGen)
    }

    return(
        <>
        <div>
            <div className="flex flex-row w-full h-16 border-2 border-black text-center">
                <div>Generation {number};</div>
                <button className="bg-red-200 h-8 w-8" onClick={handleHide}/>
            </div>
            <div className={"flex flex-row flex-wrap" + (hideThisGen ? " hidden" : "")}>
                {pokemonRenders()}
            </div>
            
        </div>
        </>
    )
}

export default GenerationX;