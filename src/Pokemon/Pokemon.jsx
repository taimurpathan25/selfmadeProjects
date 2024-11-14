import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';
import './Pokemon.css';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchPokemon, setSearchPokemon] = useState('')

    const API = 'https://pokeapi.co/api/v2/pokemon?limit=50';

    const fetchPokemon = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            console.log(data) 

           const pokemonDetailData = data.results.map(async(currentPokemonData)=>{
            // console.log(currentPokemonData)
               const res = await fetch(currentPokemonData.url);
               const data = await res.json();
               return data;
            })
            // console.log(pokemonDetailData)
            const getAllData = await Promise.all(pokemonDetailData);
            console.log(getAllData)
            setPokemon(getAllData);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
            setError(error)
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[])
    
    // For Title update
    // useEffect(()=>{
    //     if(searchPokemon){
    //         document.title = `Pokemon Name : ${searchPokemon}`
    //     }
    //     else{
    //         document.title = 'All Pokemons'
    //     }
    // },[searchPokemon])

    // For Title and Favicon update based on search term
    useEffect(() => {
        if (searchPokemon) {
            document.title = `Searching for: ${searchPokemon}`;

            // Find the first matched Pokémon image for favicon
            const matchedPokemon = pokemon.find(p => p.name.toLowerCase().includes(searchPokemon.toLowerCase()));
            if (matchedPokemon) {
                changeFavicon(matchedPokemon.sprites.front_default); // Set to Pokémon's image
            } else {
                resetFavicon(); // Reset to default if no match is found
            }
        } else {
            document.title = "Pokémon Search";
            resetFavicon(); // Reset to default when no search
        }
    }, [searchPokemon, pokemon]);

    // Helper function to change favicon
    const changeFavicon = (url) => {
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    // Helper function to reset favicon to default
    const resetFavicon = () => {
        changeFavicon('/path/to/default/favicon.ico'); // Update with path to your default favicon
    };


    // Search Functionality
    const searchPokemonData = pokemon.filter((currSearchPokemonData)=>
        currSearchPokemonData.name.toLowerCase().includes(searchPokemon.toLowerCase()));
    // console.log(searchPokemonData)
    // End Search Functionality

    if(loading){
        return (
            <h1 className='text-5xl font-bold text-center'>Loading .....</h1>
        )
    }

    if (error) {
        return(
            <h1 className='text-4xl font-bold text-center'>Error: {error.message}</h1>
        )
    }


    return (
    <>
    <div className="heading">
        <h1 className=''>Let's Catch the Pakemons</h1> 
       </div>
       <input type="text" placeholder='Search Pokemon Cards'className='search-pokemon' value={searchPokemon} onChange={(e)=>setSearchPokemon(e.target.value)}/>
    <div className="pokemon-cards grid grid-cols-3 gap-5 mt-2 container mx-auto px-8">
    {/* {pokemon.map((currAllData)=>{ */}
    {searchPokemonData.map((currAllData)=>{
        return(
            <PokemonCards key={currAllData.id} pokemonAllData={currAllData} />
        )
    })}
    
    </div>
    </>
  )
}

export default Pokemon