import './ProductModal.scss';

const ProductModal = ({showModal, onToggleModal}) => {
    let clazz = '';
    if(showModal === true){
        clazz = ' show ';
    } else {
        clazz = ' hide ';
    }
    return (
        <div className={'product-modal '+clazz} onClick={onToggleModal}>
            <div className='product-modal__modal'>

            </div>
        </div>
    );
}

export default ProductModal;