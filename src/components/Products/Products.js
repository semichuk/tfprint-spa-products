import Product from '../Product/Product.js';
import './Products.scss';

const Products = ({serverAPI, onGetProducts, products}) => {
    let arrayProducts = [];

    products.forEach(element => {
        const product = (<Product data={element}></Product> );
        arrayProducts.push(product);
    });

    return (
        <div className="products">
            {arrayProducts}
        </div>
              
    );
}

export default Products;