import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
// import { useLocation } from 'react-router-dom';
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./style.scss";
// import FormItemInput from 'shared/components/FormItemInput/FormItemInput';
import FormCustom from 'shared/components/FormCustom/FormCustom';
import Bottom from 'shared/components/Bottom/Bottom';
import FormDetail from 'shared/components/FormDetail/FormDetail';
import Popover from 'shared/components/Popover/Popover';
import Notification from 'shared/components/Notification/Notification';

import RouterPath from 'router/RouterPath';

function DetailSupplierContainer(props)
{
    let location = useLocation();
    let history = useHistory();
    let { id } = useParams();
    const dispatch = useDispatch()
    const [Options, setOptions] = useState([
        { value: 1, text: "Giao dịch" },
        { value: 2, text: "Tạm dừng" },

    ]);
    const { data, loading, detail } = useSelector(state => state.App.superliData)
    const [rowdetail, setRowDetail] = useState([]);

    const [isChangeData, setisChangeData] = useState(false);
    const [record, setRecord] = useState([]);
    useEffect(() =>
    {

        if (id) {
            dispatch({
                type:AppAction.FETCH_GET_DATA_ID,
                payload: {
                    data: id
                }
            })
        }

        return reset();

    }, [])

    const reset = () =>
    {
        setRowDetail([]);
        setRecord([])
    }
    
    useEffect(() =>
    {
        if (detail) {
            setRecord(detail)
            setRowDetail([
                { label: "Tên nhà cung cấp", text: detail.Name },
                { label: "Trạng thái", text: detail.status == 2 ? <span style={{ color: "rgba(255, 52, 52, 1)" }}>Tạm dừng</span> : <span style={{ color: "#138300" }}>Giao dịch</span> },
                { label: "Danh mục", text: detail.cate },
                { label: "Tỉnh/ Thành phố", text: detail.province },
                { label: "Điện thoại", text: detail.phone },
                { label: "Quận/Huyện", text: detail.district },
                { label: "Email", text: detail.email },
                { label: "Phường/Xã", text: detail.war },
                { label: "Công nợ", text: detail.codeCN },
                { label: "Địa chỉ cụ thể", text: detail.address },
                { label: "Mã code", text: detail.code },
            ])
            setisChangeData(false)
        }

    }, [detail])
    const DeleteRecord = (item) =>
    {

        item.deleted = true
        dispatch({
            type: AppAction.FETCH_POST_DATA,
            payload: {
                data: item
            }
        })
        setisChangeData(!isChangeData);
        Notification.primary({
            content: "Đang xoá nhà cung cấp",
            icon: <img src='images/ic_question.svg' className='icon_' />,
            action: <button className='reset_btn'
                style={{
                    background: "#D8D7D7",
                    borderRadius: "3px",
                    width: "68px",
                    height: "28px",

                }} onClick={() =>
                {
                    UndoDeleteRecord(item)
                }} >Hoàn tác</button>,
            isAutoHide: true,
            ishide: false,
            isTimeout: 1500,
            cb: () =>
            {
                history.goBack()
            }
        });

        // history.goBack()
    }
    const UndoDeleteRecord = (item) =>
    {
        item.deleted = false
        dispatch({
            type: AppAction.FETCH_POST_DATA,
            payload: {
                data: item
            }
        })
        // setisHideNoti(true)
        Notification.success({
            content: "Hoàn tác",
            icon: <img src='images/ic_check_success.svg' className='icon_' />,
            action: "",
            isAutoHide: true,
            ishide: false,
            isTimeout: 1500
        });
        setisChangeData(!isChangeData);
    }
    const onchangeStatus = (e) =>
    {


        dispatch({
            type: AppAction.FETCH_PUT_DATA,
            payload: {
                data: { ...record, status: e }
            }
        })
        setisChangeData(true);
    }
    return (



        <div className="DetailSupplierContainer" id='detail_supplier_container'>
            <div className='status_header'>
                <Popover
                    title={""}
                    body={
                        <div className='btn_action_table' style={{ display: "flex", flexDirection: "column" }}>
                            {Options && Options.map((item, index) =>
                            {
                                let textClass = item.value === 1 ? "text-success" : "text-danger";

                                return <button className='reset_btn' onClick={() =>
                                {
                                    onchangeStatus(item.value)
                                }}>
                                    <span className={textClass}>{item.text}</span>
                                </button>

                            })}
                        </div>
                    }
                    style={{width: "120px",height: "auto",

                    }}
                    stylePop={{ }}
                    isHover={true}
                    right={"0"}
                    bottom={"0"}
                >
                    <button className='reset_btn' style={{ cursor: "pointer" }}><img src='images/ic_change.svg' className='icon_' style={{ width: "24px", height: "24px" }} /></button>
                </Popover>
            </div>
            <FormDetail
                title="Thông tin nhà cung cấp"
                isRequired={true}
                style={{ width: "346px" }}
                data={rowdetail}
                coloums={2}
            />
            <Bottom>

                <div className='bottom-left'>
                    <button className='reset_btn' onClick={() =>
                    {
                        history.goBack()
                    }}><img src='images/ic_left.svg' className='icon_ ' style={{ width: "24px", height: "24px" }} /><span className='text-05' >Quay lại</span></button>

                </div>
                <div className='bottom-right'>
                    <button className='reset_btn stand_radius text-danger danger_btn_outline' onClick={() =>
                    {
                        DeleteRecord(record)
                    }}>Xóa</button>
                    <button className='reset_btn stand_radius success_btn  text-white'
                        onClick={() =>
                        {
                            history.push(`${RouterPath["EDIT"].replace("/:id", "/")}${id}`)
                        }}
                    >Sửa</button>
                </div>
            </Bottom>
        </div>
    )
}
export default DetailSupplierContainer;