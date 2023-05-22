import './Search.scss';
import search from '../../assets/search.svg';

const Search = () => {
    return (
        <div className="header__search">
            <button className='btn btn-light'><img src={search}/></button>
            <input className="form-control"></input>
        </div>
    );
}

export default Search;