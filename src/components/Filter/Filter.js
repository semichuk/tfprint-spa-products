
import './Filter.scss';

const Filter = ({onFilter, show, filter}) => {

    const showClass = show ? 'dropdown-menu show' : 'dropdown-menu'
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" onClick={onFilter} type="button" id="dropdownMenuButton" >
                {filter}
            </button>
            <div className={showClass} aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
            </div>
        </div>
    )
}

export default Filter;