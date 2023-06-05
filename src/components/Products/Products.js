import Product from '../Product/Product.js';
import './Products.scss';

const Products = ({onChangeModal, onGetProducts, products, onRenderProductModal}) => {
    let arrayProducts = [];

    products.forEach((item) => {
        const product = (<Product key={+item.id} data={item} onChangeModal={onChangeModal} onGetProducts={onGetProducts} onRenderProductModal={onRenderProductModal}></Product> );
        arrayProducts.push(product);
    });

    return (
        <div className="products">
            {arrayProducts}
        </div>
              
    );
}

export default Products;