import React, { useState, useEffect, useRef } from 'react';

import "./style.scss"

function Bottom(props)
{

    const { title, body, style, isHover, top, bottom, left, right, children } = props
    // const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    // const [isClick, setIsClick] = useState(false);
    const popRef = useRef()
    // const [isHovering, setIsHovering] = useState(false);
    useEffect(() =>
    {
        const pop = popRef.current;

        // console.log('====================================');
        // console.log(popRef.current.offsetHeight);
        // console.log('====================================');
        // setPosition({ top: !top ? pop.offsetHeight : top, bottom: bottom ?? 0, left: left ?? 0, right: right ?? 0 })
    }, []);


    return (
        <div className={`Bottom`} id='bottom' >
            {children}
        </div>
    )
}


export default Bottom;