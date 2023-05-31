import './Range.scss';

const Range = ({ onMaxValue, onMinValue, minValue, maxValue, minRange, maxRange, leftRange, widthRange }) => {
    const styleSliderRange = {
        width: `${widthRange}%`,
        left: `${leftRange}%`,
    }
    return (
        <div className='range'>
            <input type="range" min={minRange} max={maxRange} value={minValue} id="slider-1" onChange={onMinValue} className='thumb thumb--zindex-3' />
            <input type="range" min={minRange} max={maxRange} value={maxValue} id="slider-2" onChange={onMaxValue} className='thumb thumb--zindex-4' />
            <div className="slider">
                <div className="slider__track" />
                <div className="slider__range" style={styleSliderRange}/>
            </div>
            <div className='range__values'>
                <div>Мин.:{minValue+"₽"}</div>
                <div>Макс.:{maxValue+"₽"}</div>
            </div>

        </div>
    )
}

export default Range;