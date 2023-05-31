import './Search.scss';
import search from '../../assets/search.svg';

const Search = ({onSearch}) => {
    return (
        <div className="header__search">
            <img src={search}/>
            <input className="form-control" placeholder='Наименование товара' onChange={onSearch}></input>
        </div>
    );
}

export default Search;