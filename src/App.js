import { useState } from 'react';
import  Axios  from 'axios';
import {Paper,Card,CardMedia,Container, Typography} from "@mui/material";
import './App.css';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({ 
    name: "", 
    species: "",
    img: "",
    hp: "",
    defense: "",
    attack: "",
    type: ""
  });
  
  const searchPokemon = () => {
   Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
   .then((response) => {
    setPokemon({
      name: pokemonName, 
      species: response.data.species.name,
      img: response.data.sprites.front_default,
      hp: response.data.stats[0].base_stat,
      defense: response.data.stats[2].base_stat,
      attack: response.data.stats[1].base_stat,
      type: response.data.types[0].type.name,
       ability1: response.data.abilities[0].ability.name,
       //ability2: response.data.abilities[1].ability.name
      });
      setPokemonChosen(true);
   });
  }
  return (
    <div className="App">
    <div className='title'>
    <div className='pokeball'>
    <h1>PokeDex</h1>
    <img src="https://img.icons8.com/color/2x/pokeball.png"/>
    </div>
   
    <input type="text" onChange={event => {setPokemonName(event.target.value)}}></input>
    <button onClick={searchPokemon}>Search Pokemon</button>
    </div>
    <div className='Display'>
         {
            !pokemonChosen ? (<h1>Please choose a pokemon </h1>) : 
            (
           
            
             <Container sx={{
              width: '400px',
              marginTop: '2rem',
              marginBottom: '2rem',
              
             }}>
              <Card>
                <Paper sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    bgcolor: '#ded5f3',
                
                }}>
             <Typography><h1>{pokemon.name}</h1></Typography>
             <CardMedia><img src={pokemon.img}/></CardMedia>
             <Typography><h3>Type: {pokemon.type}</h3></Typography>
             <Typography><h3>Hp: {pokemon.hp}</h3></Typography>
             <Typography><h3>Attack: {pokemon.attack}</h3></Typography>
             <Typography><h3>Defense: {pokemon.defense}</h3></Typography>
             <Typography><h3>Abilities: {pokemon.ability1}  </h3></Typography>
                </Paper>
             
             </Card>
             </Container>
             
            


            )
         }
    </div>
    </div>
  );
}

export default App;
