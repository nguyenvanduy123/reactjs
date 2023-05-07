import React, { useState, useEffect } from 'react';
import "./style.scss"
import { Link, useHistory, useLocation } from "react-router-dom";


function Menu(props)
{
    let history = useLocation();
    let path_ = location.pathname;


    const [menu, setMenu] = useState([
        { title: "Tổng quan", link: "/tongquan", icon: <img src='images/ic_gen.svg' className='icon_ ' /> },
        { title: "Danh mục NCC", link: "/nhacungcap/danhmuc", icon: <img src='images/ic_list_sup.svg' className='icon_ ' /> },
        { title: "Danh sách NCC", link: "/nhacungcap/danhsach", icon: <img src='images/ic_list_super.svg' className='icon_ ' /> },
        { title: "Lịch sử đặt hàng", link: "/nhacungcap/lichsudathang", icon: <img src='images/ic_trunck.svg' className='icon_ ' /> },
        { title: "Bảng báo giá", link: "/nhacungcap/bangbaogia", icon: <img src='images/ic_check_pr.svg' className='icon_ ' /> },
        { title: "lịch sử theo dõi", link: "/nhacungcap/lichsutheodoi", icon: <img src='images/ic_check_his.svg' className='icon_ ' /> },
    ]);


    return (
        <div className="Menu" id='menubar'>
            <div className='topmneu'>
                <button className='reset_btn' onClick={() =>
                {
                    history.goBack()
                }} style={{ zIndex: 100 }}>
                    <img src='images/ic_back.svg' className='icon_ ' />
                </button>
                <a className='logo_'>
                    <img src='images/ic_logo.svg' className='icon_ logo' />
                </a>
            </div>
            <ul className='menu'>
                {menu && menu.map((item, index) =>
                {

                    let active = "";
                    if (item.link == path_ || path_.includes(item.link)) {
                        active = "active"
                    }

                    return <li key={index} className={`item_menu ${active}`}><Link to={item.link}>{item.icon}<span>{item.title}</span></Link></li>
                })}
                {/* <li className='item_menu'><Link to={"/tongquan"}><img src='images/ic_gen.svg' className='icon_ ' /><span>Tổng quan</span></Link></li>
                <li className='item_menu'><a><img src='images/ic_list_sup.svg' className='icon_ ' /><span>Danh mục NCC</span></a></li>
                <li className='item_menu active'><Link to={"/danhsach"} ><img src='images/ic_list_super.svg' className='icon_ ' /><span>Danh sách NCC</span></Link></li>
                <li className='item_menu'><a><img src='images/ic_trunck.svg' className='icon_ ' /><span>Lịch sử đặt hàng</span></a></li>
                <li className='item_menu'><a><img src='images/ic_check_pr.svg' className='icon_ ' /><span>Bảng báo giá</span></a></li>
                <li className='item_menu'><a><img src='images/ic_check_his.svg' className='icon_ ' /><span>Lịch sử theo dõi</span></a></li> */}
            </ul>

        </div>
    )
}
export default Menu;