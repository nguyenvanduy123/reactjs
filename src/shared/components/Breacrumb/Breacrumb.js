import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss"
function Brearumb(props)
{

    const { pathsTitle, paths } = props

    return (
        <div className="Brearumb" id='breacrumb'>
            {pathsTitle && pathsTitle.map((item, index) =>
            {
                if (item) {
                    return <div key={index} className={'item_ ' + props?.className}>
                        <Link to={paths[index]}>{item}</Link>
                        <img src='images/ic_right.svg' className='icon_ logo' />
                    </div>
                }



            })}
        </div>
    )
}


export default Brearumb;