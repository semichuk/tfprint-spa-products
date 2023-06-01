import './Categories.scss';

const Categories = ({ categories, onShowCategories, onClickCategory, desiredCategory }) => {
    const show = categories.show,
        data = categories.result;
    const showClass = show ? ' show ' : ' ';
    const listCategories = [];
    data.forEach(element => {
        const listItem = (<button key={element.id} onClick={() =>{onClickCategory(+element.id, element.name);onShowCategories();}}  className="dropdown-item" >{element.name}</button>);
        listCategories.push(listItem);
    });
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" onClick={onShowCategories} type="button" id="dropdownMenuButton" >
                {desiredCategory.name}
            </button>
            
            <div className={'dropdown-menu' +showClass} aria-labelledby="dropdownMenuButton">
            
                {listCategories}
            </div>
            <div className={'dropdown-menu-background ' + showClass} onClick={onShowCategories}>
            </div>
        </div>
    );
};
export default Categories;