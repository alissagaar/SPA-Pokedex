import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './SearchBar.module.css';

export default function SearchBar() {
    const [input, setInput] = useState('')
    let history = useHistory();

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSearch = () => {
        history.push(`/pokeName/${input.toLowerCase()}`);
    }

    return(
        <div>
            <input className={s.input} type="text" autoComplete="off" value={input} onChange={handleChange} placeholder='Try with Pikachu' />
            { input.length ? <button className={s.search} onClick={handleSearch}>Search</button> : <button className={s.search} disabled>Search</button>}
        </div>
    )
}