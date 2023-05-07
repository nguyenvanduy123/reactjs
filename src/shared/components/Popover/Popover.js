import React, { useState, useEffect, useRef } from 'react';
import "./style.scss"

function Popover(props)
{

    const { title, body, style, isHover, top, bottom, left, right, stylePop } = props
    const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    const [isClick, setIsClick] = useState(false);
    const popRef = useRef()
    const popbodyRef = useRef()
    const [isHovering, setIsHovering] = useState(false);
    useEffect(() =>
    {
        const pop = popRef.current;

        // console.log('====================================');
        // console.log(popRef.current.offsetHeight);
        // console.log('====================================');
        setPosition({ top: !top ? pop.offsetHeight : top, bottom: bottom ?? 0, left: left ?? 0, right: right ?? 0 })
    }, []);

    const timeoutRef = useRef(null);
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
            const parentNode = popbodyRef.current.parentNode;
            const parentNodePos = parentNode.getBoundingClientRect();
            // console.log('====================================');
            // console.log(parentNodePos);
            // console.log('====================================');
            if ((popoverRect.right + popoverRect.width + 50) > screenWidth) {
                // if ((popoverRect.right + (popoverRect.width / 2)) > screenWidth) {
                //     popbodyRef.current.style.left = "-" + popoverRect.width + "px"; // dịch popover vào bên trong màn hình theo chiều rộng
                // } else {
                //     popbodyRef.current.style.left = "-" + (popoverRect.width / 2) + "px"; // dịch popover vào bên trong màn hình theo chiều rộng
                // }
                // popbodyRef.current.style.left = "-" + ((popoverRect.width / 2)) + "px"; // dịch popover vào bên trong màn hình theo chiều rộng
                // popbodyRef.current.style.left = "-" + ((popoverRect.width - 8)) + "px"; // dịch popover vào bên trong màn hình theo chiều rộng
            }
            if ((popoverRect.bottom + popoverRect.height + 50) > screenHeight) {
                // if ((popoverRect.bottom + (popoverRect.height / 2)) > screenHeight) {
                //     popbodyRef.current.style.top = "-" + (popoverRect.height) + "px"; // dịch popover vào bên trong màn hình theo chiều cao
                // } else {
                //     popbodyRef.current.style.top = "-" + (popoverRect.height / 2) + "px"; // dịch popover vào bên trong màn hình theo chiều cao
                // }
                // popbodyRef.current.style.top = "-" + ((popoverRect.height - 8)) + "px"; // dịch popover vào bên trong màn hình theo chiều cao
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
        <div className={`Popover ${isHover ? "is_hover" : ""}`} id='popover' ref={popRef}
            onClick={() => setIsClick(!isClick)}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}

            style={{ ...stylePop }}
        >
            <div className={`content_  ${isClick ? "is_click" : ""}`}
                style={{
                    top: Position.top,
                    bottom: Position.bottom,
                    left: Position.left,
                    right: Position.right,
                    inset: "unset",
                    ...style
                }}
                ref={popbodyRef}
            >
                {title && <div className='title'>
                    {title}
                </div>}
                <div className='body'>
                    {body}
                </div>
            </div>
            {props.children}
        </div>
    )
}


export default Popover;