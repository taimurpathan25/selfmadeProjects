import React from 'react'
import './Pokemon.css'

const PokemonCards = ({pokemonAllData}) => {
  return (
    <>
       <div className="main-section">
    <div className="pokemon-card">
        <div className="child-div"></div>
        <figure>
            <img src={pokemonAllData.sprites.other.dream_world.front_default} alt={pokemonAllData.name} />
        </figure>
        <div className="pokemon-type">
            <p>
                {
                    pokemonAllData.types.map((currType) => {
                        return currType.type.name
                    }).join(" , ")
                }
                </p>
        </div>
        <h1 className='text-3xl text-center mb-5'>{pokemonAllData.name}</h1>
        <div className="pokemon-details flex justify-center">
        <div className="pokemon-paragraph">
            <span><b>Height</b> : {pokemonAllData.height}</span>
        </div>
        <div className="pokemon-paragraph">
            <span><b>Weight</b> : {pokemonAllData.weight}</span>
        </div>
        <div className="pokemon-paragraph">
            <span><b>Speed</b> : {pokemonAllData.stats[5].base_stat}</span>
        </div>
        </div>

        <div className="pokemon-details flex justify-center">
        <div className="pokemon-paragraph">
            <span><b>Experience</b> : {pokemonAllData.base_experience}</span>
        </div>
        <div className="pokemon-paragraph">
            <span><b>Defence</b> : {pokemonAllData.stats[2].base_stat}</span>
        </div>
        <div className="pokemon-paragraph">
            <span><b>abilities</b> : {pokemonAllData.abilities.map((currAbilities)=>{
                return currAbilities.ability.name
            }).slice(0,1)}</span>
        </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default PokemonCards