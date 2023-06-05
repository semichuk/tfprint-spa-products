import './DeleteProductModal.scss';
import deleteProduct from '../../requests/deleteProduct.js';

const DeleteProductModal = ({ showModal, onCloseModal, serverAPI, onChangeModal, deleteProductObj, onGetProducts }) => {
    let clazz = '';
    if (showModal.show === true && showModal.status === "delete") {
        clazz = ' show ';
    } else {
        clazz = ' hide ';
    }

    const onDelete = async (event) => {
        try {
            event.preventDefault();
            await deleteProduct(serverAPI + "products/" + +deleteProductObj.id, {
                "id": +deleteProductObj.id
            }).then((result) => {
                console.log(result);
            })
            await onGetProducts(serverAPI);
            onCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={'product-modal ' + clazz} >
            <div className='product-modal__modal'>
                <h3 className='product-modal__title'>Удаление товара</h3>
                <div className='product-modal__close' onClick={onCloseModal}>×</div>
                <form className='product-modal__form-delete'>
                    <h1>Вы хотите безвозвратно удалить товар "{deleteProductObj.name}"? </h1>
                    <button type="submit" className="btn btn-outline-primary" onClick={(event) => {event.preventDefault();onChangeModal();}}>Нет</button>
                    <button type="submit" className="btn btn-outline-danger" onClick={onDelete}>Да</button>
                </form>
            </div>
            <div className='product-modal__background' onClick={onCloseModal}>

            </div>
        </div>
    );
};

export default DeleteProductModal;