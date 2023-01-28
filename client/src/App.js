import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/Widgets/NavBar/NavBar';
import Home from './components/Home/Home';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonId from './components/PokemonId/PokemonId';
import PokemonName from './components/PokemonName/PokemonName';
import Landing from './components/Landing/Landing';
import s from './App.module.css';
import Footer from './components/Widgets/Footer/Footer';


function App() {
  return (
    <div className={`App ${s.app}`}>
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={NavBar} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/home' component={Footer} />
      <Route exact path='/create' component={NavBar} />
      <Route exact path='/create' component={CreatePokemon} />
      <Route exact path='/create' component={Footer} />
      <Route exact path='/pokeId/:id' component={NavBar} />
      <Route exact path='/pokeId/:id' component={PokemonId} />
      <Route exact path='/pokeId/:id' component={Footer} />
      <Route exact path='/pokeName/:name' component={NavBar} />
      <Route exact path='/pokeName/:name' component={PokemonName} />
      <Route exact path='/pokeName/:name' component={Footer} />
    </div>
  );
}

export default App;
