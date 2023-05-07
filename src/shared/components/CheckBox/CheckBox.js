import React from 'react';
import "./style.scss"
function CheckBox(props)
{

    const { value, onChange, id, style, checked, children } = props;


    return (
        <div className="CheckBox" id='checkbox'>
            {/* value={value} onChange={(e) => onChange(e, value, true)} checked={checked}  */}
            <input type="checkbox" id={id} value={value} onChange={(e) => onChange(e, value, true)} checked={checked} />
            <label htmlFor={id} style={style}>{children}</label>

        </div>
    )
}


export default CheckBox;