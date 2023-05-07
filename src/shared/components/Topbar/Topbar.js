import React from 'react';
import Brearumb from '../Breacrumb/Breacrumb';
import Popover from '../Popover/Popover';

import "./style.scss"

import { useHistory, Link, useLocation } from 'react-router-dom';
import RouterPath from 'router/RouterPath';

function Topbar(props)
{
    let history = useHistory();
    let location = useLocation();
    const { titlePaths } = props

    let path_ = location.pathname ? location.pathname.split("/") : [];
    let paths_ = path_.filter(function (elem)
    {
        return elem !== "";
    });

    let pathsTitle = ["Nhà cung cấp"];
    let paths = [];
    let pathBf = ""
    

    paths_.map((item, index) =>
    {
        pathBf += "/" + item
        paths.push(pathBf)
        if (index == (paths_.length - 1)) {
            return
        }
        if (titlePaths[pathBf]) {

            pathsTitle.push(titlePaths[pathBf])
        }
    });
    pathsTitle.push(titlePaths[location.pathname]);



    return (
        <div className="Topbar" id='topbar'>
            <div className='left'>
                <Popover
                    title={""}
                    body={
                        <div className='pop_btn_addnew'>
                            <Link to={`${RouterPath["ADD"]}`} className='reset_btn btn_' >Tạo nhà cung cấp</Link>
                        </div>
                    }
                    style={{
                        width: "190px",
                        height: "60px",
                    }}
                    isHover={false}
                >
                    <button className='reset_btn'>  <img src='images/ic_addnew.svg' className='icon_ logo' /></button>
                </Popover>

                <h4 className='title_text'>Bán hàng</h4>
                <div className='line_v'></div>
                <Brearumb paths={paths} pathsTitle={pathsTitle} className={"title2_text"} />
            </div>
            <div className='right'>
                <div className='menu_top_right'>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_menu_top.svg' className='icon_' /></button>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_dasboard.svg' className='icon_' /></button>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_addlist.svg' className='icon_' /></button>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_bell.svg' className='icon_' />
                        <span className='note'>12</span>
                    </button>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_home.svg' className='icon_' /></button>

                </div>
                <div className='btn_user'>
                    <button className='reset_btn menu_top_right_item'> <img src='images/ic_user.svg' className='icon_' /></button>
                </div>
            </div>
        </div>
    )
}
export default Topbar;