// import Filters from './components/Filters/Filters.js';
import Categories from './components/СrutchCategories/Categories.js'
import Products from './components/Products/Products.js';
import Search from './components/Search/Search.js';
import Range from './components/Range/Range.js';
import ProductModal from './components/ProductModal/ProductModal.js';

import getProducts from './requests/getProducts.js';

import './App.scss';

import { useState, useCallback, useEffect } from 'react';

const App = () => {
    const serverAPI = 'https://tfprint.ru/rest_api_products/';
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    // const [filters, setFilters] = useState([
    //     { id: 1, filter: 'Категория', show: false },
    //     { id: 2, filter: 'Размер', show: false },
    //     { id: 3, filter: 'Намотка', show: false }
    // ]);
    const [desiredCategory, setDesiredCategory] = useState({
        "id": "1",
        "name": "Все продукты",

    });
    const [productModal, setProductModal] = useState(-1);
    const [categoriesСrutch, setCrutch] = useState({
        "result":
            [{
                "id": "1",
                "0": "1",
                "name": "Все продукты",
                "1": "Все продукты",
                "parent_category": "0",
                "2": "0"
            },
            {
                "id": "18",
                "0": "18",
                "name": "Самоклеящиеся этикетки",
                "1": "Самоклеящиеся этикетки",
                "parent_category": "2",
                "2": "2"
            },
            {
                "id": "9",
                "0": "9",
                "name": "Термоэтикетки",
                "1": "Термоэтикетки",
                "parent_category": "2",
                "2": "2"
            },
            {
                "id": "19",
                "0": "19",
                "name": "Термотрансферные этикетки",
                "1": "Термотрансферные этикетки",
                "parent_category": "2",
                "2": "2"
            },
            {
                "id": "20",
                "0": "20",
                "name": "Синтетические этикетки",
                "1": "Синтетические этикетки",
                "parent_category": "2",
                "2": "2"
            },
            {
                "id": "10",
                "0": "10",
                "name": "Весовые ленты",
                "1": "Весовые ленты",
                "parent_category": "2",
                "2": "2"
            },
            {
                "id": "14",
                "0": "14",
                "name": "Принтеры офисные",
                "1": "Принтеры офисные",
                "parent_category": "4",
                "2": "4"
            },
            {
                "id": "15",
                "0": "15",
                "name": "Принтеры промышленные",
                "1": "Принтеры промышленные",
                "parent_category": "4",
                "2": "4"
            },
            {
                "id": "16",
                "0": "16",
                "name": "Принтеры переносные",
                "1": "Принтеры переносные",
                "parent_category": "4",
                "2": "4"
            },
            {
                "id": "17",
                "0": "17",
                "name": "Принтеры для печати браслетов",
                "1": "Принтеры для печати браслетов",
                "parent_category": "4",
                "2": "4"
            }],
        "show": false
    })
    // const [categories, setCategories] = useState([]);
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

    // const onFilter = (id) => {
    //     const newFilters = filters.map((filter) => {
    //         if (filter.id === id) {
    //             filter.show = !filter.show;
    //         } else {
    //             filter.show = false;
    //         }
    //         return filter;
    //     });
    //     setFilters(newFilters);
    // };

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

    // const onGetCategories = (API) => {
    //     getProducts(API + 'categories')
    //         .then((data) => {
    //             setCategories(data.result);
    //         }).catch((e) => {

    //             console.log("error" + e);
    //         });
    // };

    const searchFilter = (products, str) => {
        const filtred = products.filter((item) => {
            if (item.name.indexOf(str) >= 0) {
                return item;
            }
        });
        return filtred;
    };

    const categoryFilter = (products, desiredCategory) => {
        const filtred = products.filter((item) => {
            if (+item.category_id === +desiredCategory.id) {
                return item;
            }
            if (+desiredCategory.id === 1) {
                return item;
            }
        });
        return filtred;
    };

    const priceFilter = (products, min, max) => {
        const filtered = products.filter((item) => {
            if (item.price >= min && item.price <= max) {
                return item;
            }
        });
        return filtered;
    }

    const getPercent = useCallback(
        (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
        [minRange, maxRange]
    );
    const findMax = () => {
        let max = 0;
        products.forEach(element => {
            if (Number(element.price) > max) {
                max = Number(element.price);
            }
        });
        return max;
    };

    const onGetProducts = (API) => {
        getProducts(API + 'products')
            .then((data) => {
                setProducts(data.result);
            }).catch((e) => {

                console.log("error" + e);
            });
    };

    const onToggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        onGetProducts(serverAPI);
        // onGetCategories(serverAPI);
    }, []);


    useEffect(() => {
        const max = findMax();
        setMaxRange(max);
        setMaxValue(max)
    }, [products]);


    useEffect(() => {
        const minPercent = getPercent(minValue);
        const maxPercent = getPercent(maxValue); // Preceding with '+' converts the value from type string to type number
        setLeftRange(minPercent);
        setWidthRange(maxPercent - minPercent);
    }, [minValue, getPercent, maxValue]);

    const filtredProducts = categoryFilter(priceFilter(searchFilter(products, search), minValue, maxValue), desiredCategory);

    return (
        <div className='grid-global' >
            <header className='header'>
                <div className='header__toolbar'>
                    <button className='header__creater-product btn btn-outline-primary '>Создать товар</button>
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
                    onToggleModal={onToggleModal}
                    onRenderProductModal={onRenderProductModal}
                />
                <ProductModal products={products}
                    productModal={productModal}
                    showModal={showModal}
                    onToggleModal={onToggleModal}
                    onGetProducts={onGetProducts}
                    serverAPI={serverAPI} />
            </main>
        </div>
    );
}

export default App;
