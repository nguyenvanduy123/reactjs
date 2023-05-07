import React, { useState, useEffect, useRef } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import InputSeach from '../InputSeach/InputSeach';

import "./style.scss"
function Pagination(props)
{

    const { Options, value, LimitOption, LimitRecord, id, placeholder, onChange, isHover, icon, top, style, OnChangeSelectNumPages, ShowStatus, CurrentPage, TotalRecord } = props;

    const [ValueSelect, setValueSelect] = useState({});
    const [Statuspage, setStatuspage] = useState("Hiển thị từ - trên tổng");


    const onchangeStatus = (e) =>
    {

        setValueSelect(e)
        OnChangeSelectNumPages(e)
    }
    useEffect(() =>
    {

        setValueSelect(LimitRecord)
        setShowStatus()

        if (LimitOption) {
            setValueSelect({ value: LimitOption, text: LimitOption });
        }

    }, []);


    useEffect(() =>
    {

        setShowStatus()

    }, [ValueSelect]);
    useEffect(() =>
    {


        setShowStatus()

    }, [LimitOption, CurrentPage]);


    const setShowStatus = () =>
    {

        const start = ((CurrentPage - 1) * LimitRecord) + 1;
        const end = (CurrentPage * (LimitRecord)) > TotalRecord ? TotalRecord : (CurrentPage * (LimitRecord));
        setStatuspage(`Hiển thị từ ${start ?? ""} - ${end} trên tổng ${TotalRecord ?? ""}`)
    }
    return (
        <div className={`Pagination stand_radius`} id='pagination' style={{ ...style }}>
            <div className='chose_row_show'>
                <span style={{ marginRight: "10px" }}>Hiển thị</span>
                <Dropdown className="_select_input inputs_item" placeholder={"Trạng thái "} id="status" name="status"
                    Options={Options}
                    onChange={onchangeStatus}
                    value={ValueSelect.value}
                    isHover={true}
                    style={{
                        height: "24px",
                        width: "65px",
                        padding: 0
                    }}
                    icon={
                        <img src='images/ic_dropdown_small.svg' className='icon_' style={{
                            width: "24px", height: "24px"
                        }} />
                    }
                    itemStyle={{
                        padding: 0,
                        height: "25px"
                    }}
                    bodyStyle={{
                        padding: "5px 10px"
                    }}
                />
            </div>
            {ShowStatus && <div className='_show_detail'>
                <span style={{ marginRight: "10px" }}>{Statuspage}</span>

            </div>
            }
            <div className='pagination_wrrap'>

                <ButtonPage {...props} limit={LimitRecord} />


            </div>
        </div>
    )
}

function ButtonPage(props)
{
    const { TotalRecord, CurrentPage, OnclickButtonChangePage, OnclickButtonNext, OnclickButtonPre, limit, LimitButton } = props;
    const renders = [];
    let totalVisiblePages = LimitButton
    let TotalPage = Math.ceil((TotalRecord / limit))

    let startPage = Math.max(1, CurrentPage - Math.floor(totalVisiblePages / 2));
    let endPage = Math.min(TotalPage, startPage + totalVisiblePages - 1);
    if (endPage - startPage < totalVisiblePages - 1) {
        startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }
    if (TotalPage) {

        for (let i = startPage; i <= endPage; i++) {

            renders.push(<button className={`reset_btn item item_left ${CurrentPage == i ? "active" : ""}`}
                onClick={(e) => OnclickButtonChangePage(e, i)}
            >
                {i}
            </button>)
        }


    }
    return (<>
        <button className='reset_btn item item_left' onClick={(e) => { OnclickButtonPre(e, CurrentPage <= 1 ? 1 : CurrentPage - 1) }}>
            <img src='images/ic_left.svg' className='icon_' style={{
                width: "24px", height: "24px"
            }} />
        </button>
        {renders.map((item, index) =>
        {
            return <div key={index}>{item}</div>

        })}
        <button className='reset_btn item item_right' onClick={(e) => OnclickButtonNext(e, CurrentPage >= TotalPage ? TotalPage : CurrentPage + 1)}>
            <img src='images/ic_right.svg' className='icon_' style={{
                width: "24px", height: "24px"
            }} />
        </button>
    </>

    )


}

export default Pagination;