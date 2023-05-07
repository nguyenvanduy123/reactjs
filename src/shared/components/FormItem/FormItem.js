import React from 'react';
import Brearumb from '../Breacrumb/Breacrumb';
import Popover from '../Popover/Popover';

import "./style.scss"
import RouterPath from 'router/RouterPath';
import { useHistory, Link } from 'react-router-dom';

function FormItem(props)
{
    let history = useHistory();
    const { label, id, name, value, placeholder, vertical, horizontal, isRequired, hidden, style, styleInput, onChange } = props
    // console.log('====================================');
    // console.log(history);
    // console.log('====================================');
    return (
        <div className="FormItemInput" id='form_item_' style={{ visibility: hidden ? "hidden" : "visible", ...style }}>
            <label htmlFor={id} style={{
                ...horizontal ? { marginRight: "8px" } : { marginBottom: "8px" }
            }}>{label} {isRequired && <span style={{ color: "rgba(255, 52, 52, 1)", marginLeft: "3px", fontWeight: "bold" }}> *</span>}
            </label>
            <div className='form_child'>


                {props.children}
            </div>
        </div>
    )
}
export default FormItem;