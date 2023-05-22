import Filters from './components/Filters/Filters.js';
// import Products from './components/Products.js';
import Search from './components/Search/Search.js';
import Range from './components/Range/Range.js';

import './App.scss';
import { useState, useCallback, useEffect } from 'react';

const App = () => {
    const [filters, setFilters] = useState([
        { id: 1, filter: 'category', show: false },
        { id: 2, filter: 'size', show: false },
        { id: 3, filter: 'count', show: false }
    ]);
    const [minValue, setMinValue] = useState(30);
    const [maxValue, setMaxValue] = useState(70);
    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(1000);
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

    const getPercent = useCallback(
        (value) => Math.round(((value - minRange) / (maxRange - minRange)) * 100),
        [minRange, maxRange]
    );

    const onFilter = (id) => {
        const newFilters = filters.map((filter) => {
            if (filter.id === id) {
                filter.show = !filter.show;
            } else {
                filter.show = false;
            }
            return filter;
        });
        setFilters(newFilters);
    };


    useEffect(() => {
        const minPercent = getPercent(minValue);
        const maxPercent = getPercent(maxValue); // Preceding with '+' converts the value from type string to type number
        setLeftRange(minPercent);
        setWidthRange(maxPercent - minPercent);
    }, [minValue, getPercent, maxValue]);


    return (
        <div className='grid-global' >
            <header className='header'>
                <Search />
                <div className='header__filters'>
                    <Filters filters={filters}
                        onFilter={onFilter} />
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
            <main>

            </main>
        </div>
    );
}

export default App;
