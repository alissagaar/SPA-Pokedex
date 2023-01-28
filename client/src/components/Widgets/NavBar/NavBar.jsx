import { NavLink } from 'react-router-dom';
import PokemonLogo from '../../../images/pokemon_logo.png'
import s from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav>
            <NavLink to='/home' ><img className={s.logo} src={PokemonLogo} alt="Pokemon_Logo" /></NavLink> 
            <ul>
                <NavLink to='/create' ><li>Create Pokemon</li></NavLink>
            </ul>
        </nav>
    )
}