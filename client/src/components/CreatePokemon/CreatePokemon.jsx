import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import * as actions from '../../redux/actions/index';
import validate from "./validate";
import s from './CreatePokemon.module.css';

export default function CreatePokemon() {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    
    const [errors, setErrors] = useState({});
    const history = useHistory()

    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    useEffect(()=>{
        dispatch(actions.getTypes());
    },[dispatch])
    
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheckChange = (e) => {
        if(e.target.checked){
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })

            setErrors(validate({
                ...input,
                types: [...input.types, e.target.value]
            }))
        }else {
            setInput({
                ...input,
                types: input.types.filter(t => t !== e.target.value)
            })

            setErrors(validate({
                ...input,
                types: input.types.filter(t => t !== e.target.value)
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.name.length && input.image.length && input.types.length && Object.keys(errors).length === 0){
            dispatch(actions.createPokemon(input));
            dispatch(actions.getAllPokemons());
            alert('Pokemon has been successfully created!')
            setInput({
                name: '',
                image: '',
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0,
                weight: 0,
                types: []
            });
            history.push('/home');
        }else {
            alert('Error: All the required fields(*) must be completed')
        }
    }

    return(
        <div>
            <section className={s.heroCreate}>
                <div className={s.hero}>
                    <h1>Your Creation, <br /> Your Own Pokemon!</h1>
                </div>
            </section>
            <form className={s.form} onSubmit={handleSubmit} >
                <div className={s.fields}>
                    <section className={s.info}>
                        <div className={s.data}>
                            <div>
                                <div className={s.textInput}>
                                    <label>Name*</label><br />
                                    <input type="text" name="name" value={input.name} onChange={handleInputChange} />
                                    {errors.name && (<span className={s.danger}><br /> {errors.name}</span>)}
                                </div>
                                <div className={s.range} >
                                    <label>Health</label><br />
                                    <input type="range" name="hp" value={input.hp} min="20" max="100" onChange={handleInputChange} />
                                    <br /><span>{input.hp}</span>
                                </div>

                                <div className={s.range}>
                                    <label>Defense</label><br />
                                    <input type="range" name="defense" value={input.defense} min="20" max="200" onChange={handleInputChange} />
                                    <br /><span>{input.defense}</span>
                                </div>

                                <div className={s.range}>
                                    <label>Height</label><br />
                                    <input type="range" name="height" value={input.height} min="20" max="500" onChange={handleInputChange} />
                                    <br /><span>{input.height}</span>
                                </div>
                            </div>
                            <div className={s.dataTwo}>
                                <div className={s.textInput}>
                                    <label>Image*</label><br />
                                    <input type="text" name="image" value={input.image} onChange={handleInputChange} />
                                    {errors.image && (<span className={s.danger}><br /> {errors.image}</span>)}
                                </div>

                                <div className={s.range}>
                                    <label>Attack</label><br />
                                    <input type="range" name="attack" value={input.attack} min="20" max="200" onChange={handleInputChange} />
                                    <br /><span>{input.attack}</span>
                                </div>

                                <div className={s.range}>
                                    <label>Speed</label><br />
                                    <input type="range" name="speed" value={input.speed} min="20" max="100" onChange={handleInputChange} />
                                    <br /><span>{input.speed}</span>
                                </div>

                                <div className={s.range}>
                                    <label>Weight</label><br />
                                    <input type="range" name="weight" value={input.weight} min="20" max="1000" onChange={handleInputChange} />
                                    <br /><span>{input.weight}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={s.types}>
                        <label>Types*</label>
                        <div className={s.list}>
                            { types && types.map((type) => (
                             <div>
                                 <input className={s.checkbox} type="checkbox" id={type.id} value={type.name} onChange={handleCheckChange} />    
                                 <span>{type.name}</span>
                             </div>
                            ))}
                        </div>
                        {errors.types && (<span className={s.danger}><br /> {errors.types}</span>)} <br />

                        <br />

                        {!errors.name && !errors.image && !errors.types ? 
                        <button className={s.active} type="submit">Create Pokemon</button> : <button className={s.disabled} type="submit" disabled>Create Pokemon</button> }
                    </section>
                </div>
            </form>
        </div>
    )
}
