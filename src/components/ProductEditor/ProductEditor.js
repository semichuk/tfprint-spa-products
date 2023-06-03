// App.jsx / App.tsx

import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductEditor = ({ contentProduct, onChange}) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(contentProduct);
    }, [contentProduct]);

    const onChangeContent = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        setContent(data);
        onChange(data);
    };


    return (
        <div className="product-editor">
            <CKEditor
                editor={ClassicEditor}
                data={content}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={onChangeContent}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default ProductEditor;
