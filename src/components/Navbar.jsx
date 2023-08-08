import React from "react";;
import { useState } from "react";
import PokeBall from '../assets/icons/pokeballico.png'
function Navbar(){

    const [showLinks, setShowLinks] = useState(false);

    const handleToggle = ()=> {
        setShowLinks(!showLinks)
    };


    return(
        <div className="flex flex-col">
            <div className="flex flex-row w-full h-16 border-b-2 border-gray-200">
                <img src={PokeBall} className="h-16 w-16 my-auto mx-2"/>
                <button className="lg:hidden" onClick={handleToggle}>
                        <img src='' className="h-12 w-12"/>
                </button>
                <div className="lg:flex hidden my-auto w-7/12">
                    
                </div>
                <div className="lg:flex hidden my-auto w-4/12 pl-24 flex-row space-x-6 text-2xl hover:cursor-pointer">
                    <div className="text-blue-700 my-auto font-semibold"></div>
                    <div className="text-sm my-auto font-bold"></div>
                </div>
            </div>
            {(showLinks && (
                <div className={`"lg:hidden flex flex-col bg-sky-600 text-2xl font-semibold w-full h-screen text-white"`}>
                    <ul className="flex flex-col space-y-6 text-2xl mt-8 ml-6"> 
                        <li>About</li>
                        <li>Join us</li>
                        <li>Shop</li>
                        <li>Help</li>
                        <li>Packs</li>
                        <li>Try it for free</li>
                        <li className="text-md font-thin">Log in or Register</li>
                    </ul>
                    <ul className="flex flex-col space-y-6 text-2xl mt-8 ml-6">
                        <li>More on Yangyin.com</li>
                        <li>Blog</li>
                        <li>YangYin for the classroom</li>
                        <li>YangYin for Collegues and Universities</li>
                        <li>Certified trainings</li>
                        <li>Jobs</li>
                    </ul>
                </div>
            ))}
     </div>
    );
};

export default Navbar;