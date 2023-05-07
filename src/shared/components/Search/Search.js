import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import InputSeach from '../InputSeach/InputSeach';
import AppAction from 'redux/app/action';
import { useSelector, useDispatch } from 'react-redux';
import "./style.scss"
function Search(props)
{
    const { data, loading } = useSelector(state => state.App.superliData)
    // const { title, body, style, isHover } = props
    // const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    // const [isClick, setIsClick] = useState(false);
    const dispatch = useDispatch()
    const [Options, setOptions] = useState([
        { value: 1, text: "Giao dịch" },
        { value: 2, text: "Tạm dừng" },
        { value: 3, text: "Tất cả" }
    ]);
    const [ValueStatus, setValueStatus] = useState(false);
    const [ValueAddress, setValueAddress] = useState(false);
    const [ValueSearch, setValueSearch] = useState(false);
    // const popRef = useRef()
    useEffect(() =>
    {

    }, []);

    const onchangeStatus = (e) =>
    {

        setValueStatus(e)

    }
    const onchangeAddress = (e) =>
    {
        setValueAddress(e)

    }
    const onchangeSearch = (e) =>
    {
        // if (!e.target.value) {
        //     return
        // }

        setValueSearch(e.target.value)

    }

    const onHandleSearch = () =>
    {

        dispatch({
            type: AppAction.FETCH_GET_DATA_SEARCH,
            payload: {
                data: {
                    status: ValueStatus.value,
                    text: ValueSearch
                }
            }
        })
    }
    const resetSeacrh = () =>
    {

        dispatch({
            type: AppAction.FETCH_GET_DATA_SEARCH,
            payload: {
                data: {
                    status: "",
                    text: ""
                }
            }
        })
        setValueSearch("")
        setValueStatus("")
        setValueAddress("")
    }
    return (
        <div className={`Search stand_radius`} id='search' >
            <div className='inputs_'>
                <InputSeach className="search_input inputs_item"
                    placeholder={"Tìm kiếm mã NCC, tên NCC, email, "} id="s" name="s"
                    onChange={onchangeSearch}
                    value={ValueSearch}
                />
                <Dropdown className="_select_input inputs_item" placeholder={"Trạng thái "} id="status" name="status"
                    Options={Options}
                    onChange={onchangeStatus}
                    value={ValueStatus.text}
                    isHover={true}
                    icon={<img src='images/ic_dropdown.svg' className='icon_' />}
                />

                <Dropdown className="_select_input inputs_item" placeholder={"Địa chỉ "} id="address" name="address"
                    Options={Options}
                    onChange={onchangeAddress}
                    value={ValueAddress.text}
                    isHover={true}
                    icon={<img src='images/ic_dropdown.svg' className='icon_' />}
                />
            </div>

            <div className='action_btn '>
                <button className='reset_btn stand_radius  secondary_btn text-secondary' style={{
                    width: "106px",

                }} onClick={resetSeacrh}>
                    Thiết lập lại
                </button>
                <button className='reset_btn stand_radius success_btn text-white ' style={{
                    width: "90px",

                }} onClick={onHandleSearch}>
                    Tìm kiếm
                </button>
                <button className='reset_btn stand_radius success_btn-05 ' style={{
                    width: "32px",

                }}>
                    <img src='images/ic_slider.svg' className='icon_ ' />
                </button>

                <button className='reset_btn stand_radius warning_btn ' style={{
                    width: "32px",

                }} >
                    <img src='images/ic_dot.svg' className='icon_ ' />
                </button>
            </div>
        </div>
    )
}


export default Search;