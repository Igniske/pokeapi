import React from "react";;
import { useState } from "react";
import PokeBall from '../assets/icons/pokeballico.png'
import PokeLogo from "../assets/icons/pokelogoico.png"

function Navbar(){

    const [showLinks, setShowLinks] = useState(false);

    const handleToggle = ()=> {
        setShowLinks(!showLinks)
    };


    return(
        <div className="flex flex-col">
            <div className="flex flex-row w-full h-16 border-b-2 border-gray-200">
                <div className="lg:w-5/6 w-2/3">
                    <img src={PokeBall} className="h-16 w-16 my-auto mx-2"/>
                </div>
                <div className="lg:w-1/6 w-1/3">
                    <img src={PokeLogo} className="h-14 w-40 my-auto mx-2"/>
                </div>
            </div>
            
     </div>
    );
};

export default Navbar;