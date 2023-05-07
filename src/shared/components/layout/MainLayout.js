import React from 'react';

function MainLayout(props)
{
    // console.log('====================================');
    // console.log(props.children);
    // console.log('====================================');
    return (
        <div className="MainLayout">
            {props.children}
        </div>
    )
}
export default MainLayout;