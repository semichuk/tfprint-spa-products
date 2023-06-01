import Product from '../Product/Product.js';
import './Products.scss';

const Products = ({onToggleModal, onGetProducts, products}) => {
    let arrayProducts = [];

    products.forEach(({id, ...data}) => {
        const product = (<Product key={+id} data={data} onToggleModal={onToggleModal} onGetProducts={onGetProducts}></Product> );
        arrayProducts.push(product);
    });

    return (
        <div className="products">
            {arrayProducts}
        </div>
              
    );
}

export default Products;