import { useEffect } from 'react';
import Product from '../Product/Product.js'

const Products = ({serverAPI, onGetProducts}) => {
    
    let arrayProducts = [];
    return (
        <div className="products">
            {arrayProducts}
        </div>
              
    );
}

export default Products;