import React from 'react';
import axios from 'axios';
import { Pokemon } from 'pokenode-ts'
import { useState } from 'react'; 
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import './App.css';
import { Box, Button, Grid, Paper, Skeleton} from '@mui/material';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState<null | undefined | Pokemon>(undefined);

  const POKEMON_BASE_URL = "https://pokeapi.co/api/v2";

  return (
    <div className='search-field'>
      <h1>Pokemon Search</h1>
      
      <div id='search-content'>
        <TextField
          id="search-bar"
          className='text'
          value={pokemonName}
          onChange={(prop: any) => {
            setPokemonName(prop.target.value);
          }}
          label="Enter a Pokémon Name..."
          variant='outlined'
          placeholder='Search...'
          size='small'
        />

        <Button
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </Button>
      </div>

      {pokemonInfo === undefined ? (
        <div></div>
      ) : (
        <div id="pokemon-result">
          <Paper sx={{ backgroundColor: getBackColor(pokemonInfo) }}>
            <Grid container direction="row" spacing={5} sx={{ justifyContent: "center" }}>
            <Grid item>
              <Box>
                {pokemonInfo === undefined || pokemonInfo === null ? (
                  <h1>Pokemon not found</h1>
                ) : (
                  <div>
                    <h1>{pokemonInfo.name.charAt(0).toUpperCase() +
                      pokemonInfo.name.slice(1)}
                    </h1>
                    <p>
                      ID: {pokemonInfo.id}
                      <br />
                      Height: {pokemonInfo.height * 10} cm
                      <br />
                      Weight: {pokemonInfo.weight / 10} kg
                      <br />
                      Types: {pokemonInfo.types.map((item) => item.type.name).toString()}
                      <br />
                      Abilities: {pokemonInfo.abilities.map((item) => item.ability.name).toString()}
                    </p>
                  </div>
                )}
              </Box>
            </Grid>
            <Grid item>
              <Box>
                {pokemonInfo !== null && pokemonInfo.sprites.other.dream_world.front_default? (
                  <img 
                    src={pokemonInfo.sprites.other.dream_world.front_default} 
                    alt={pokemonInfo.name}
                  ></img>
                ) : (
                  <Skeleton width={300} height={300} />
                )}
              </Box>
            </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  function getBackColor(poke: Pokemon | undefined | null) {
    let backColor = "#EEE8AA";
    if (poke === undefined || poke === null) {
      return backColor;
    }

    const pokeTypes = poke.types.map((i) => i.type.name);
    if (pokeTypes.includes("fire")) {
      backColor = "#FEC5BB";
    } else if (pokeTypes.includes("grass")) {
      backColor = "#80FFDB";
    } else if (pokeTypes.includes("water")) {
      backColor = "#DFE7FD";
    } else if (pokeTypes.includes("bug")) {
      backColor = "#B0DEA3";
    } else if (pokeTypes.includes("normal")) {
      backColor = "#E0FFFF";
    } else if (pokeTypes.includes("electric")) {
      backColor = "#D8E2DC";
    } else if (pokeTypes.includes("ground")) {
      backColor = "#FAD2E1";
    } else if (pokeTypes.includes("fairy")) {
      backColor = "#FFF1E6";
    } else if (pokeTypes.includes("ghost")) {
      backColor = "#F8EDEB";
    } else if (pokeTypes.includes("fighting")) {
      backColor = "#F1FAEE";
    } else if (pokeTypes.includes("rock")) {
      backColor = "#A8DADC";
    }
    return backColor;
  }

  function search() {
    console.log(pokemonName);
    if (pokemonName === undefined || pokemonName === "") {
      return;
    }

    axios.get(POKEMON_BASE_URL + "/pokemon/" + pokemonName.toLowerCase())
    .then((res) => {
      setPokemonInfo(res.data);
    })
    .catch(() => {
      setPokemonInfo(null);
    });
  }
}

export default App;