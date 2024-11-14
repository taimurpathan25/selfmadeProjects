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
    useEffect(()=>{
        if(searchPokemon){
            document.title = `Pokemon Name : ${searchPokemon}`
        }
        else{
            document.title = 'All Pokemons'
        }
        // console.log(searchPokemon)
    },[searchPokemon])

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