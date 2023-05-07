import React, { useState, useEffect, useRef } from 'react';
import "./style.scss"
function Dropdown(props)
{

    const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    const [isClick, setIsClick] = useState(false);
    const popRef = useRef()
    const timeoutRef = useRef(null);
    const popbodyRef = useRef()
    const { Options, value, id, placeholder, onChange, isHover, icon, top } = props;
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
    useEffect(() =>
    {
        if (isClick) {
            const popoverRect = popbodyRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth; // lấy chiều rộng của màn hình
            const screenHeight = window.innerHeight; // lấy chiều cao của màn hình

            if ((popoverRect.right) > screenWidth) {

                popbodyRef.current.style.left = "-" + (popoverRect.width) + "px"; // dịch popover vào bên trong màn hình theo chiều rộng
            }
            if ((popoverRect.bottom) > screenHeight) {
                popbodyRef.current.style.top = "-" + (popoverRect.height) + "px"; // dịch popover vào bên trong màn hình theo chiều cao
            }


        }
    }, [isClick]);
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
            className={`Dropdown  ${props.className ?? ""}`}
            id='dropdown'
            style={{ ...props?.style ?? "" }}
            onClick={() => { setIsClick(!isClick) }}
            ref={popRef}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <div className='inputs_item stand_input' >
                <div className={`icon_float ${isClick ? "is_change" : ""}`}>{icon}</div>
                <input className='reset_input input_item' id={id ?? ""} name={props.name ?? ""} placeholder={placeholder ?? ""}
                    value={value ? value : ""}
                    autoComplete={("off").toString()} onChange={() => { }} />
            </div>
            <div className={`dropdown_body stand_radius ${props.classNameBody ?? ""} ${isClick ? "show" : ""}`}
                style={{

                    top: !top ? Position.top : top,
                    ...props.bodyStyle
                    // bottom: Position.bottom,
                    // left: Position.left,
                    // right: Position.right,
                    // ...props.BodyStyle ?? "",
                }}
                ref={popbodyRef}
            >

                <ul>
                    {Options && Options.map((item, index) =>
                    {
                        return <li className='stand_input' key={index} onClick={() => { setIsTitle(item); onChange(item) }} style={{ ...props.itemStyle }} >{item.text ? item.text : ""}</li>
                    })}


                </ul>
            </div>
        </div>
    )
}


export default Dropdown;