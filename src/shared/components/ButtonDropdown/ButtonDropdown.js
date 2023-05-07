import React, { useState, useEffect, useRef } from 'react';
import "./style.scss"
function ButtonDropdown(props)
{

    const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    const [isClick, setIsClick] = useState(false);
    const popRef = useRef()

    const { Options, value, id, placeholder, onChange, children, icon, isHover } = props;
    const [isTitle, setIsTitle] = useState("");
    const [heightDropdown, setHeightDropdown] = useState("");
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() =>
    {
        const pop = popRef.current;
        const Optionslen = Options.length;
        setHeightDropdown(Optionslen * 10);

        setPosition({ top: pop.offsetHeight, bottom: 0, left: 0, right: 0 })
    }, []);

    useEffect(() =>
    {
        if (!isHovering) {
            setIsClick(isHovering);
        }
        if (isHover && isHovering) {
            setIsClick(isHovering);
        }
    }, [isHovering]);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () =>
    {
        clearTimeout(timeoutRef.current);
        setIsHovering(true);
    };

    const handleMouseLeave = () =>
    {
        timeoutRef.current = setTimeout(() => setIsHovering(false), 200);
    };


    return (
        <div
            className={`ButtonDropdown  stand_radius ${props.className ?? ""}`}
            id='button_dropdown'
            style={{ ...props?.style ?? "" }}
            onClick={() => { setIsClick(!isClick) }}
            ref={popRef}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <div className={`inputs_item ${placeholder && !value ? "text_placeholder" : ""}`} style={{ ...props?.styleInput ?? "" }} >
                <div className={`icon_float ${isClick ? "is_change" : ""}`}>{icon}</div>
                {children}
            </div>
            <div className={`dropdown_body stand_radius ${props.classNameBody ?? ""} ${isClick ? "show" : ""}`}
                style={{

                    top: Position.top,
                    // bottom: Position.bottom,
                    // left: Position.left,
                    // right: Position.right,
                    // ...props.BodyStyle ?? "",
                }}>

                <ul>
                    {Options && Options.map((item, index) =>
                    {

                        if (value !== item.value) {
                            return <li className='stand_input' key={index} onClick={() => { setIsTitle(item); onChange(item.value) }} >{item.text}</li>
                        }

                    })}


                </ul>
            </div>
        </div>
    )
}


export default ButtonDropdown;