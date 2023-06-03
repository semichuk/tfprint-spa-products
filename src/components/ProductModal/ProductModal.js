import { useEffect, useState } from 'react';
import ProductEditor from '../ProductEditor/ProductEditor.js';
import updateProduct from '../../requests/updateProduct.js';
import './ProductModal.scss';

const ProductModal = ({ showModal, onToggleModal, products, productModal, onGetProducts, serverAPI }) => {
    const [productId, setProductId] = useState(-1),
        [name, setName] = useState(''),
        [price, setPrice] = useState(-1),
        [longtitle, setLongtitle] = useState(''),
        [description, setDescription] = useState(''),
        [published, setPublished] = useState(-1),
        [img, setImg] = useState(''),
        [content, setContent] = useState(''),
        [badge, setBadge] = useState({
            "status": "Нет статуса",
            "class": "bg-secondary"
        });

    useEffect(() => {
        if (productModal > -1) {
            products.forEach(item => {
                if (+item.id === productModal) {
                    setProductId(+item.id);
                    setName(item.name);
                    // category_id = +item.category_id;
                    setPrice(+item.price);
                    setLongtitle(item.longtitle);
                    setDescription(item.description);
                    if (+item.published === 1) {
                        setPublished(true);
                    } else if (+item.published === 0) {
                        setPublished(false);
                    }
                    setImg(item.image);
                    setContent(item.content);
                    setBadge({
                        "status": "Нет статуса",
                        "class": "bg-secondary"
                    });
                }
            });
        }

    }, [products, productModal])

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
            await updateProduct(serverAPI + "products/" + productId, {
                "id": productId,
                "name": name,
                "price": price,
                "longtitle": longtitle,
                "description": description,
                "published": published ? 1 : 0,
                "content": content
            }).then((result) => {
                console.log(result);
            })
            await onGetProducts(serverAPI);
            setBadge({
                "status": "Успешно сохранено",
                "class": "bg-success"
            })
        } catch (error) {
            console.log(error);
            setBadge({
                "status": "Ошибка сохранения",
                "class": "bg-danger"
            })
        }

    }

    let clazz = '';
    if (showModal === true) {
        clazz = ' show ';
    } else {
        clazz = ' hide ';
    }
    return (
        <div className={'product-modal ' + clazz} >
            <div className='product-modal__modal'>
                <h3 className='product-modal__title'>Редактирование товара</h3>
                <div className='product-modal__close' onClick={onToggleModal}>×</div>
                <form className='product-modal__form'>
                    <div className='product-modal__information'>
                        <img className='product-modal__img' src={"https://www.tfprint.ru/" + img} alt=''></img>

                        <div className='form-group'>
                            <label for='formName'>Наименование товара</label>
                            <input className='form-control' type='text' id='formName' value={name} name='name' onChange={(event) => { setName(event.target.value) }}></input>
                        </div>
                        <br />
                        <div className='form-group'>
                            <label for='formName'>Цена(₽)</label>
                            <input className='form-control' type='number' value={price} name='price' onChange={onChangePrice} />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label for='formName'>Длинное название</label>
                            <input className='form-control' type='text' value={longtitle} name='longtitle' onChange={(event) => { setLongtitle(event.target.value) }} />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label for='formName'>Описание</label>
                            <input className='form-control' type='text' value={description} name='description' onChange={(event) => { setDescription(event.target.value) }} />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label for='formName'>Опубликованно</label>
                            <input type='checkbox' checked={published} name='published' onChange={onChangePublished} />
                        </div>

                    </div>
                    <div className='product-modal__content'>
                        <ProductEditor onChange={onChangeContent} contentProduct={content} />
                        <div className='product-modal__status-submit'>
                            <div className={"badge " + badge.class}>{badge.status}</div>
                            <button type="submit" className="btn btn-outline-primary" onClick={onFormSubmit}>Сохранить изменения</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='product-modal__background' onClick={onToggleModal}>

            </div>
        </div>
    );
};

export default ProductModal;