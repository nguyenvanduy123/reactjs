import React, { useEffect, useState } from 'react';
import Brearumb from '../Breacrumb/Breacrumb';
import Popover from '../Popover/Popover';

import "./style.scss"
import RouterPath from 'router/RouterPath';
import { useHistory, Link } from 'react-router-dom';

function FormDetail(props)
{
    let history = useHistory();
    const { title, id, name, data, children, vertical, coloums, styleItem, horizontal, onChange } = props

    return (
        <div className="FormDetail" id='form_detail'>
            <div className='title_form'>
                {title}
            </div>
            <div className='form_cus' style={{
                ...vertical ? { flexDirection: "column" } : { flexDirection: "row", justifyContent: "space-between" }
            }}>
                {data && data.map((item, index) =>
                {
                    return <div key={index} className='item_row' style={{
                        ...styleItem,
                        width: `${coloums ? (100 / coloums) : 100 / 2}%`
                    }}><div className='text-05'>{item.label}</div>
                        <div className='font-weigth-500 '>
                            <span className='dot2'>:</span> 
                            {item.text}
                        </div>
                    </div>

                })}
            </div>

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
export default FormDetail;