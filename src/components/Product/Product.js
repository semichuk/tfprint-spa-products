import './Product.scss';

const Product = ({ data }) => {
    const name = data.name,
        price = data.price,
        description = data.description,
        image = data.image;

    return (
        <div className="product">
            <div className='product__img'>
                <img src={"https://www.tfprint.ru/" + image} alt=""></img>
            </div>
            <div className='product__discription'>
                <div>{name}</div>
                <div>{"Цена: "+price}</div>
                <div>{description}</div>
            </div>
            <div className='product__buttons'>
                <button className='product__change-button'>Редактировать</button>
            </div>
        </div >
              
    );
}

export default Product;