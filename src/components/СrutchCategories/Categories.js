import './Categories.scss';

const Categories = ({categories, onClickCategories}) => {
    const show = categories.show,
        data = categories.result;
    const showClass = show ? 'dropdown-menu show' : 'dropdown-menu';
    const listCategories = [];
    data.forEach(element => {
        const listItem = (<button key={element.id} className="dropdown-item" >{element.name}</button>);
        listCategories.push(listItem);
    });
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" onClick={onClickCategories} type="button" id="dropdownMenuButton" >
                {data[0].name}
            </button>
            <div className={showClass} aria-labelledby="dropdownMenuButton">
                {listCategories}
            </div>
        </div>
    );
};
export default Categories;