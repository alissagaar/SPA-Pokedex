import { useState , useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Pokemons from '../Widgets/Pokemons/Pokemons';
import SearchBar from '../Widgets/SearchBar/SearchBar';
import s from './Home.module.css';

export default function Home() {
    const pokemons = useSelector(state => state.pokes);
    const types = useSelector(state => state.types);
    const dispatch = useDispatch()
    let initialLoad = useRef(true);

// Filter Options ------------------------------------------
    const [filterPanel, setFilterPanel] = useState({
        author: "none",
        type: "none",
        order: "none",
    });
   
    useEffect(() => {
        if (initialLoad.current) {
            dispatch(actions.getTypes());
            dispatch(actions.getAllPokemons());
            initialLoad.current= false;
            return;
        }
        dispatch(actions.filterBy(filterPanel.author, filterPanel.type))
        dispatch(actions.sortBy(filterPanel.order))
        console.log(filterPanel.author, filterPanel.type)
    }, [dispatch, filterPanel])

    const handleFiltersChange = (e) => {
        setFilterPanel({ 
            ...filterPanel,
            [e.target.id]: e.target.value
        });
      };

// Pagination ------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [pokesPerPage] = useState(12);

    // Get current pokemons
    const indexOfLastPoke = currentPage * pokesPerPage
    const indexOfFirstPoke = indexOfLastPoke - pokesPerPage
    const currentPokes = pokemons.slice(indexOfFirstPoke,indexOfLastPoke);

    const pageNumber = Math.ceil(pokemons.length / pokesPerPage)
    
    // Change Page
    const next = () =>{
        if(currentPage < pageNumber) setCurrentPage(currentPage + 1);
        else setCurrentPage(1);
    }
    const back = () =>{
        if(currentPage !== 1) setCurrentPage(currentPage - 1);
        else setCurrentPage(pageNumber);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return(
        <div>
            <section className={s.heroHome} >
                <div className={s.hero} >
                    <div className={s.content}>
                        <h1>Discover all the details <br /> of your best-loved pokemons</h1>
                        <SearchBar />
                    </div>
                </div>
            </section>
            <section className={s.filter}>
                <div>
                    <select className={s.selector}
                        name='author'
                        value={filterPanel.author === 'none' ? 'Filter by Creator' : filterPanel.author}
                        id='author'
                        onChange={(e) => handleFiltersChange(e) }
                    >
                        <option value="none">Filter by Creator</option>
                        <option value="pokeapi">Poke Api</option>
                        <option value="own">Own Poke</option>
                    </select>
                </div>
                <div>
                    <select className={s.selector}
                        name='type'
                        value={filterPanel.type === 'none'? 'Filter by Types': filterPanel.type}
                        id='type'
                        onChange={(e) => handleFiltersChange(e) }
                    >
                        <option value="none">Filter by Types</option>
                        {types && types.map((type, i) => <option key={i} value={type.name} >{type.name}</option>)}
                    </select>
                </div>
                <div>
                    <select className={s.selector}
                        name='order'
                        value={filterPanel.order === 'none'? 'Sort by': filterPanel.order}
                        id='order'
                        onChange={(e) => handleFiltersChange(e) }
                    >
                        <option value="none">Sort by</option>
                        <option value="asc">Aa - Zz</option>
                        <option value="desc">Zz - Aa</option>
                        <option value="ws">Weak - Strong</option>
                        <option value="sw">Strong - Weak</option>
                    </select>
                </div>
            </section>
            <section>
                { currentPokes.length && 
                    <div>
                        <Pokemons pokemons={currentPokes}/>
                        <div className={s.pagination}>
                            { currentPage === 1 ?                              
                            <div className={s.pagbutton} >
                                <button className={s.disabled} disabled>Back</button>
                                <button className={s.next} onClick={next} >Next</button>
                            </div> :                             
                            <div className={s.pagbutton} >
                                <button className={s.back} onClick={back} >Back</button>
                                <button className={s.next} onClick={next} >Next</button>
                            </div>}
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}