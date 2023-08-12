import React from "react";
import { useState, useEffect } from "react";

function GenerationX({name, number, firstNum, secondNum, handleShow, Shiny, toUpper, borderColor, allUpper}){

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
             <div key={index} className={`lg:w-1/3 w-1/2 h-1/2 pb-4 border-2 border-black background-${poke.types[0].type.name}`}>
                <div className='border-2 w-5/6 mx-auto my-2 text-center border-black'>
                    <div className='border-4 border-stone-400'>
                        <div className='border-2 border-black bg-white'>
                            {toUpper(poke.name)} #{poke.id}
                        </div>
                    </div>
                </div>
                <div className="flex m-auto">
                    <div className="flex flex-row m-auto space-x-5">
                        <button className="h-1/6 w-fit px-4 rounded-full border-2 border-white bg-black" onClick={() => handleShow(poke.id)}><div className="text-white">Display</div></button>
                        <button className={"h-8 w-8 bg-white rounded-full border-2 border-black"} onClick={()=> {
                            const updatedPokes = [...thisGenerationPokes];
                            updatedPokes[index].shiny = !updatedPokes[index].shiny; 
                            setThisGenerationPokes(updatedPokes); 
                            }}><img className="h-6" src={Shiny}/></button>
                    </div>
                </div>
                <div className='flex m-auto w-full py-4'>
                        {(poke.types.length > 1 ? <div className='flex flex-row border-2 border-black rounded-lg m-auto'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-l-lg text-center bg-' + borderColor(poke.types[0].type.name)}>{toUpper(poke.types[0].type.name)}</div><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-r-lg text-center bg-' + borderColor(poke.types[1].type.name)}>{toUpper(poke.types[1].type.name)}</div></div> : <div className='flex flex-row border-2 rounded-lg border-black m-auto'><div className={'h-8 w-20 py-1 text-white font-medium text-sm rounded-lg text-center bg-' + borderColor(poke.types[0].type.name)}>{toUpper(poke.types[0].type.name)}</div></div>)}
                </div>
                <div className="flex m-auto w-1/2 lg:h-4/5 h-24 lg:my-0 my-2">
                    <img src={(poke.shiny ? poke.sprites.front_shiny : poke.sprites.front_default)} className="h-full lg:w-fit w-full m-auto" />
                </div>
                    <ul className='h-fit lg:w-1/2 w-2/3 mx-auto bg-stone-900 text-justified'>
                        <div className='border-2 border-black'>
                            <div className='border-4 border-stone-400'>
                                <li className='w-full flex flex-row border-2 border-b-black  border-black'><div className='w-3/5 text-white'>Hp:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[0].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Attack:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[1].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Defense:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[2].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Sp Atk:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[3].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Sp Def:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[4].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Speed:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[5].base_stat}</div></li>
                                <li className='w-full flex flex-row border-b-2 border-b-black border-x-2 border-black'><div className='w-3/5 text-white'>Total:</div> <div className='w-2/5 bg-white border-l-2 border-l-black text-center'>{poke.stats[0].base_stat + poke.stats[1].base_stat + poke.stats[2].base_stat + poke.stats[3].base_stat + poke.stats[4].base_stat + poke.stats[5].base_stat}</div></li>
                            </div>
                        </div>
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
            <div className="flex flex-row w-full h-16 border-2 bg-red-600 text-white font-serif text-xl border-black text-center">
                
                <button className=" h-16 w-full" onClick={handleHide}><div>{name} (Generation {number}):</div></button>
            </div>
            <div className={"flex flex-row flex-wrap" + (hideThisGen ? " hidden" : "")}>
                {pokemonRenders()}
            </div>
            
        </div>
        </>
    )
}

export default GenerationX;