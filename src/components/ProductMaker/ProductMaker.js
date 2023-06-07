import { useEffect, useState } from 'react';
import ProductEditor from '../ProductEditor/ProductEditor.js';
import createProduct from '../../requests/createProduct.js';
import './ProductMaker.scss';

const ProductMaker = ({ showModal, onCloseModal, products, onGetProducts, serverAPI, categoriesСrutch }) => {
    const [productId, setProductId] = useState(-1),
        [name, setName] = useState(''),
        [price, setPrice] = useState(0),
        [alias, setAlias] = useState(''),
        [longtitle, setLongtitle] = useState(''),
        [description, setDescription] = useState(''),
        [category, setCategory] = useState(24),
        [listCategory, setListCategory] = useState([]),
        [published, setPublished] = useState(false),
        [img, setImg] = useState(''),
        [listImg, setListImg] = useState([]),
        [content, setContent] = useState(''),
        [badge, setBadge] = useState({
            "status": "Нет статуса",
            "class": " rounded-pill bg-secondary"
        });
    
        useEffect(() => {
            setBadge({
                "status": "Нет статуса",
                "class": " rounded-pill bg-secondary"
            });
        },[products]);

    const onChangeListImg = (event) => {
        setImg(event.target.value);
    };

    const onChangeListCategory = (event) => {
        setCategory(+event.target.value);
    };

    useEffect(() => {
        // onChange={() => {setImg(item.image);}}
        const array = products.map(item => {
            return (
                <option key={item.id}  value={item.image}>{item.image}</option>
            )
        });
        setListImg(array);
    }, [products]);
    useEffect(() => {
        // onChange={() => {setImg(item.image);}}
        const array = categoriesСrutch.result.map(item => {
            return (
                <option  key={item.id} value={+item.id}>{item.name}</option>
            )
        });
        array.shift();
        setListCategory(array);
    }, [categoriesСrutch]);

    const onChangePrice = (event) => {
        if (event.target.value === '') {
            setPrice(event.target.value);
        } else {
            setPrice(+event.target.value);
        }
    };

    const onChangePublished = () => {
        setPublished(!published);
    };

    const onChangeContent = (content) => {
        setContent(content);
    };

    const onFormSubmit = async (event) => {
        try {
            event.preventDefault();
            await createProduct(serverAPI + "products", {
                "name": name,
                "parent":category,
                "price": price,
                "longtitle": longtitle,
                "description": description,
                "alias": alias,
                "published": published ? 1 : 0,
                "content": content,
                "image": img

            }).then((result) => {
                console.log(result);
            })
            await onGetProducts(serverAPI);
            setBadge({
                "status": "Успешно сохранено",
                "class": " rounded-pill bg-success"
            })
        } catch (error) {
            console.log(error);
            setBadge({
                "status": "Ошибка сохранения",
                "class": " rounded-pill bg-danger"
            })
        }

    }

    let clazz = '';
    if (showModal.show === true && showModal.status === "save") {
        clazz = ' show ';
    } else {
        clazz = ' hide ';
    }
    return (
        <div className={'product-modal ' + clazz} >
            <div className='product-modal__modal'>
                <h3 className='product-modal__title'>Создание товара</h3>
                <div className='product-modal__close' onClick={onCloseModal}>×</div>
                <form className='product-modal__form'>
                    <div className='product-modal__information'>
                        <label >Изображение товара</label>
                        <div className='form-group'>
                            <img id='forImg' className='product-modal__img' src={"https://www.tfprint.ru/" + img} alt=''></img>
                            <select onChange={onChangeListImg} name='list-img' className='product-modal__list-img form-select'>
                                {listImg}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Наименование товара</label>
                            <input className='form-control' type='text' id='formName' value={name} name='name' onChange={(event) => { setName(event.target.value) }}></input>
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Цена(₽)</label>
                            <input className='form-control' type='number' value={price} name='price' onChange={onChangePrice} />
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Длинное название</label>
                            <input className='form-control' type='text' value={longtitle} name='longtitle' onChange={(event) => { setLongtitle(event.target.value) }} />
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Описание</label>
                            <input className='form-control' type='text' value={description} name='description' onChange={(event) => { setDescription(event.target.value) }} />
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Псевдоним(Латинскими буквами без пробелов)</label>
                            <input className='form-control' type='text' value={alias} name='description' onChange={(event) => { setAlias(event.target.value) }} />
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Категория</label>
                            <select onChange={onChangeListCategory} name='list-categories' className=' form-select'>
                                {listCategory}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label for='formName'>Опубликованно</label>
                            <input type='checkbox' checked={published} name='published' onChange={onChangePublished} />
                        </div>

                    </div>
                    <div className='product-modal__content'>
                        <ProductEditor onChange={onChangeContent} contentProduct={content} />
                        <div className='product-modal__status-submit'>
                            <div className={"badge " + badge.class}>{badge.status}</div>
                            <button type="submit" className="btn btn-outline-primary" onClick={onFormSubmit}>Создать товар</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='product-modal__background' onClick={onCloseModal}>

            </div>
        </div>
    );
};

export default ProductMaker;