import React, { useState, useEffect, useRef } from 'react';
import "./style.scss"
function InputSeach(props)
{


    const { id, name, value, placeholder, onChange } = props
    // const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    // const [isClick, setIsClick] = useState(false);
    // const popRef = useRef()
    useEffect(() =>
    {

    }, []);



    return (
        <div className={`InputSeach stand_radius ${props.className ?? ""}`} id='inputsearch' style={{ ...props?.style ?? "" }}>
            <div className='inputs_item stand_input'>
                <div className='icon_float'><img src='images/ic_search.svg' className='icon_' /></div>
                <input
                    className='reset_input input_item'
                    id={id ? id : ""}
                    name={name ? name : ""}
                    placeholder={placeholder ? placeholder : ""} value={value ? value : ""}
                    onChange={(e) => onChange(e)} />
            </div>
        </div>
    )
}


export default InputSeach;