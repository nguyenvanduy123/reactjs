import React, { useEffect, useState } from 'react';
import Brearumb from '../Breacrumb/Breacrumb';
import Popover from '../Popover/Popover';

import "./style.scss"
import RouterPath from 'router/RouterPath';
import { useHistory, Link } from 'react-router-dom';

function FormCustom(props)
{
    let history = useHistory();
    const { title, id, name, action, method, children, vertical, horizontal, onChange } = props

    return (
        <div className="FormCustom" id='formcustom'>
            <div className='title_form'>
                {title}
            </div>
            <form action={action ?? ""} method={method ?? ""} className='form_cus' style={{
                ...vertical ? { flexDirection: "column" } : { flexDirection: "row", justifyContent: "space-between" }
            }}>
                {children}
            </form>

        </div>
    )
}

// function RenderChild(props)
// {
//     const { childs } = props
//     const [childArr, setChildArr] = useState(0);

//     useEffect(() =>
//     {
//         const len = childs.length;

//         console.log('====================================');
//         console.log(childs.length);
//         console.log('====================================');
//     }, [childs]);

//     return (
//         childs
//     )
// }
export default FormCustom;