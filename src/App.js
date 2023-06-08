// import Filters from './components/Filters/Filters.js';
import Categories from './components/СrutchCategories/Categories.js'
import Products from './components/Products/Products.js';
import Search from './components/Search/Search.js';
import Range from './components/Range/Range.js';
import ProductModal from './components/ProductModal/ProductModal.js';
import ProductMaker from './components/ProductMaker/ProductMaker.js';
import DeleteProductModal from './components/DeleteProductModal/DeleteProductModal.js';

import getProducts from './requests/getProducts.js';

import './App.scss';

import { useState, useCallback, useEffect } from 'react';

const App = () => {
    const serverAPI = '';//Здесь должен быть url, на который будут производиться запросы
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filtredProducts, setFiltredProducts] = useState([]);
    const [deleteProductObj, setDeleteProduct] = useState({
        "id": -1,
        "name": "Product",

    });
    const [showModal, setShowModal] = useState({ "status": "", "show": false });
  
    const [desiredCategory, setDesiredCategory] = useState({
        "id": 1,
        "name": "Все продукты",

    });
    const [productModal, setProductModal] = useState(-1);
    
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [leftRange, setLeftRange] = useState(0);
    const [widthRange, setWidthRange] = useState(0);

    const onMinValue = (event) => {
        const value = Math.min(+event.target.value, maxValue - 1);
        setMinValue(value);

    };

    const onMaxValue = (event) => {
        const value = Math.max(+event.target.value, minValue + 1);
        setMaxValue(value);
    };


    const onShowCategories = () => {
        const newCategories = { ...categoriesСrutch };
        newCategories.show = !newCategories.show;
        setCrutch(newCategories);
    };
    const onRenderProductModal = (id) => {
        setProductModal(id);
    };
    const onClickCategory = (id, name) => {
        const newDesiredCategory = {
            "id": id,
            "name": name
        };
        setDesiredCategory(newDesiredCategory);

    };

    const onSearch = (event) => {
        setSearch(event.target.value);
    }

   

    const searchFilter = (products, str) => {
        let count = 0;

        if (str === "") {
            count++;
            console.log("search:" + count);

            return products;

        } else {
            const filtred = products.filter((item) => {
                if (item.name.indexOf(str) >= 0) {
                    count++;
                    return item;
                }
    
    
            });
            console.log("search:" + count);

            return filtred;

        }

        
    };

    const categoryFilter = (products, desiredCategory) => {
        let count = 0;

        const filtred = products.filter((item) => {
            if (+item.parent === +desiredCategory.id) {
                count++;

                return item;

            }
            if (+desiredCategory.id === 1) {
                count++;
                return item;
            }
        });
        console.log("category:" + count);

        return filtred;
    };

    const priceFilter = (products, min, max) => {
        let count = 0;

        const filtered = products.filter((item) => {
            if (+item.price >= min && +item.price <= max) {
                count++;

                return item;
            }
        });
        console.log("price:" + count);

        return filtered;
    }

    const getPercent = useCallback(
        (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
        [minRange, maxRange]
    );
    const findMax = (products) => {
        let max = 0;
        products.forEach(element => {
            if (Number(element.price) > max) {
                max = Number(element.price);
            }
        });
        return max;
    };

    const findMin = (products, int) => {
        let min = int
        products.forEach(element => {
            if (Number(element.price) < min) {
                min = Number(element.price);
            }
        });
        return min;
    };

    const onGetProducts = (API) => {
        getProducts(API + 'products')
            .then((data) => {
                setProducts(data.result);
            }).catch((e) => {

                console.log("error" + e);
            });
    };

    const onChangeModal = () => {
        setShowModal({ "status": "change", "show": true });
    };

    const onSaveModal = () => {
        setShowModal({ "status": "save", "show": true });
    };

    const onCloseModal = () => {
        setShowModal({ "status": "", "show": false });

    };

    const onDeleteModal = (id, name) => {
        setDeleteProduct({
            "id": id,
            "name": name,

        })
        setShowModal({ "status": "delete", "show": true });
    };

    useEffect(() => {
        onGetProducts(serverAPI);
        // onGetCategories(serverAPI);

    }, []);

    useEffect(() => {
        const filtred = categoryFilter(products, desiredCategory);
        const max = findMax(filtred);
        const min = findMin(filtred, max);
        setMaxRange(max);
        setMaxValue(max);
        setMinValue(min);
        setMinRange(min);
    }, [desiredCategory, products]);


    useEffect(() => {
        const minPercent = getPercent(minValue);
        const maxPercent = getPercent(maxValue); // Preceding with '+' converts the value from type string to type number
        setLeftRange(minPercent);
        setWidthRange(maxPercent - minPercent);
    }, [minValue, getPercent, maxValue]);


    useEffect(() => {
        setFiltredProducts(searchFilter(priceFilter(categoryFilter(products, desiredCategory), minValue, maxValue), search))
    }, [desiredCategory, maxValue, minValue, products, search]);

    return (
        <div className='grid-global' >
            <header className='header'>
                <div className='header__toolbar'>
                    {/* <button className='header__creater-product btn btn-outline-primary ' onClick={onSaveModal}>Создать товар</button> */}
                </div>
                <div className='header__filters'>
                    <Search onSearch={onSearch} />
                    <Categories categories={categoriesСrutch}
                        onShowCategories={onShowCategories}
                        onClickCategory={onClickCategory}
                        desiredCategory={desiredCategory} />
                    {/* <Filters filters={filters}
                        onFilter={onFilter} /> */}
                    <Range onMaxValue={onMaxValue}
                        onMinValue={onMinValue}
                        minValue={minValue}
                        maxValue={maxValue}
                        minRange={minRange}
                        maxRange={maxRange}
                        leftRange={leftRange}
                        widthRange={widthRange} />
                </div>
            </header>
            <main className='grid-products'>
                <Products onGetProducts={onGetProducts}
                    products={filtredProducts}
                    onChangeModal={onChangeModal}
                    onRenderProductModal={onRenderProductModal}
                />
                <ProductModal products={products}
                    productModal={productModal}
                    showModal={showModal}
                    onCloseModal={onCloseModal}
                    onGetProducts={onGetProducts}
                    serverAPI={serverAPI}
                    onDeleteModal={onDeleteModal} />

                <ProductMaker products={products}
                    showModal={showModal}
                    onCloseModal={onCloseModal}
                    onGetProducts={onGetProducts}
                    serverAPI={serverAPI}
                    categoriesСrutch={categoriesСrutch} />
                <DeleteProductModal
                    showModal={showModal}
                    onCloseModal={onCloseModal}
                    serverAPI={serverAPI}
                    onChangeModal={onChangeModal}
                    deleteProductObj={deleteProductObj}
                    onGetProducts={onGetProducts} />

            </main>
        </div>
    );
}

export default App;
