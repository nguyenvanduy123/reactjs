import React from 'react';
import Brearumb from '../Breacrumb/Breacrumb';
import Popover from '../Popover/Popover';

import "./style.scss"
import RouterPath from 'router/RouterPath';
import { useHistory, Link } from 'react-router-dom';
import FormItem from '../FormItem/FormItem';

function FormItemInput(props)
{
    let history = useHistory();
    const { label, id, name, value, placeholder, vertical, horizontal, isRequired, hidden, style, styleInput, onChange } = props
    // console.log('====================================');
    // console.log(history);
    // console.log('====================================');
    return (
        <FormItem {...props}>

            {!hidden && <input id={id} name={name} value={value} placeholder={placeholder} style={{ ...styleInput }} required={isRequired} onChange={(e) => { onChange(e) }} />}
        </FormItem>
    )
}
export default FormItemInput;