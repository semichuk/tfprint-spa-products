import Filter from '../Filter/Filter';
import RangeSlider from 'react-range-slider-input';
import { useState } from 'react';

import './Filters.scss';

const Filters = ({ filters, onFilter }) => {

    const elements = filters.map(({ id, ...props }) => {
        return (
            <Filter key={id} onFilter={() => { onFilter(id); }} {...props} />
        )
    })

    return (
        <div className="header__filters">
            {elements}
        </div>

    );
}

export default Filters;