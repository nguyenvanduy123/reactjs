import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import { useLocation, useHistory, Link } from 'react-router-dom';

import "./style.scss";
import Table from 'shared/components/Table/Table';
import ButtonDropdown from 'shared/components/ButtonDropdown/ButtonDropdown';
import Popover from 'shared/components/Popover/Popover';
import Pagination from 'shared/components/Pagination/Pagination';
import Notification from 'shared/components/Notification/Notification';

function SupplierContainer(props)
{
    let location = useLocation();
    let history = useLocation();
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => state.App.superliData)
    const [Options, setOptions] = useState([
        { value: 1, text: "Giao dịch" },
        { value: 2, text: "Tạm dừng" },

    ]);
    const [OptionsPagi, setOptionsPagi] = useState([]);
    // const [ValueSelectLimitDefault, setValueSelectLimitDefault] = useState(
    //     { value: 10, text: 10 });
    const [ValueSelectLimit, setValueSelectPage] = useState({});
    const [ValueStatus, setValueStatus] = useState({ value: "", text: "chọn trạng thái" },);
    const [CurrentPage, setCurrentPage] = useState(1);
    // const [TotalPage, setTotalPage] = useState(3);
    const [TotalRecord, setTotalRecord] = useState(0);
    const [isChangeData, setisChangeData] = useState(false);
    const [isChangeIndex, setisChangeIndex] = useState("");
    const [isHideNoti, setisHideNoti] = useState(false);
    const [DataRow, setDataRow] = useState([]);
    const [DataRowShow, setDataRowShow] = useState([]);
    const [Colums, setColums] = useState([
        {
            title: 'Mã NCC',
            dataIndex: 'codeNCC',
            style: {
                textAlign: "center"
            },
            render: (text, record) =>
            {
                return <Link to={`/nhacungcap/detail/${record.id}`} style={{ color: "#0054E1" }
                }> {text}</Link>
            }
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'Name',
            style: {
                textAlign: "left"
            }
        },
        {
            title: 'Danh mục',
            dataIndex: 'cate',
            style: {
                textAlign: "left"
            }
        },
        {
            title: 'Mã code',
            dataIndex: 'code',
            style: {
                textAlign: "center"
            }
        },
        {
            title: 'Mã công nợ',
            dataIndex: 'codeCN',
            style: {
                textAlign: "left"
            },
            render: (text, record) =>
            {
                return <span style={{ color: "#0054E1" }}>{text}</span>
            }
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            style: {
                textAlign: "left"
            }
        },

        {
            title: 'Email',
            dataIndex: 'email',
            style: {
                textAlign: "left"
            }
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            style: {
                textAlign: "left"
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            style: {
                textAlign: "center"
            },
            render: (text, record, index) =>
            {
                return <ButtonDropdown className="_select_input inputs_item" placeholder={"Trạng thái "} id="status" name="status"
                    Options={Options}
                    onChange={(e) => { onchangeStatus(e, record, index) }}
                    value={text}
                    style={{
                        backgroundColor: text === 1 ? "#008A5A" : "#F85555",
                    }}
                    icon={<img src='images/ic_dropdown_white.svg' className='icon_' />}
                    isHover={false}
                >
                    <button className='reset_btn text-white font-weigth-600'>{getStatusText(text)}</button>
                </ButtonDropdown>
            }
        },
        {
            title: 'Tác vụ',
            dataIndex: '',
            style: {
                textAlign: "center"
            },
            render: (text, record, index) =>
            {
                return <Popover
                    title={""}
                    body={
                        <div className='btn_action_table' style={{ display: "flex", flexDirection: "column" }}>
                            <button className='reset_btn'>
                                <img src='images/ic_edit.svg' className='icon_' style={{ width: "16px", height: "16px" }} />
                                <span className='text-success'>Sửa</span>
                            </button>
                            <button className='reset_btn' onClick={() => { DeleteRecord(text, record, index) }} >
                                <img src='images/ic_delete.svg' className='icon_' style={{ width: "16px", height: "16px" }} />
                                <span className='text-danger'>Xóa</span>
                            </button>
                        </div>
                    }
                    style={{
                        width: "130px",
                        height: "auto",
                    }}
                    // isHover={true}
                    left={"-320%"}
                    top={"-30px"}
                >
                    <button className='reset_btn' style={{ cursor: "pointer" }}><img src='images/ic_seting.svg' className='icon_' style={{ width: "24px", height: "24px" }} /></button>
                </Popover>
            }
        }
    ]);

    // console.log('====================================');
    // console.log(data);
    // console.log('====================================');
    useEffect(() =>
    {

        // set data row


        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: {}
            }
        })
        // setDataRow(tmpRow);


    }, [])
    useEffect(() =>
    {
        if (Array.isArray(data) && ValueSelectLimit.value && CurrentPage) {
            const indexOfLastData = CurrentPage * ValueSelectLimit.value;
            const indexOfFirstData = indexOfLastData - ValueSelectLimit.value;
            const currentData = data.slice(indexOfFirstData, indexOfLastData);

            const DataRowShow_ = currentData.filter(item =>
            {
                return !item.deleted;
            })
            setDataRowShow(DataRowShow_)
        }


    }, [loading])
    useEffect(() =>
    {

        if (data) {

            setTotalRecord(data.length)

            renderOptionlimit();
            // setDataRow(data);
        }


    }, [data])
    useEffect(() =>
    {


        if (Array.isArray(data) && ValueSelectLimit.value && CurrentPage) {
            const indexOfLastData = CurrentPage * ValueSelectLimit.value;
            const indexOfFirstData = indexOfLastData - ValueSelectLimit.value;
            const currentData = data.slice(indexOfFirstData, indexOfLastData);

            const DataRowShow_ = currentData.filter(item =>
            {
                return !item.deleted;
            })
            setDataRowShow(DataRowShow_)
        }
    }, [ValueSelectLimit, CurrentPage, data])
    useEffect(() =>
    {
        if (DataRowShow[isChangeIndex]) {
            DataRowShow[isChangeIndex].status = ValueStatus
            setDataRowShow(DataRowShow)

            // console.log('====================================');
            // console.log("okokokoooooooooooo", DataRowShow[isChangeIndex], isChangeIndex, ValueStatus);
            // console.log('====================================');

            setisChangeData(!isChangeData)
        }


    }, [isChangeIndex, ValueStatus])

    const renderOptionlimit = () =>
    {
        if (data) {
            const result = [];

            const dataLen = data.length;

            for (let i = 1; i <= 2; i++) {

                const dataPerpage = Math.ceil(((dataLen) / 2)) * i

                result.push({ value: dataPerpage, text: dataPerpage });

            }
            setValueSelectPage(result[0]);
            setOptionsPagi(result);
        }
    }
    const getStatusText = (e) =>
    {
        return (Options.filter(item =>
        {
            return e === item.value
        }))[0].text
    }
    const DeleteRecord = (e, item, index) =>
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
                    UndoDeleteRecord(e, item, index)
                }} >Hoàn tác</button>,
            isAutoHide: true,
            ishide: false,
            isTimeout: 5000
        });


        // const tmp = (data.data || []).filter((el, i) =>
        // {
        //     if (item.id == el.id) {
        //         j = i
        //     }
        //     return item.id == el.id
        // })
        // setisChangeData(!isChangeData)
        // // DataRow[j].deleted = true
        // // setDataRow(DataRow)
    }

    const UndoDeleteRecord = (e, item, index) =>
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
            isTimeout: 1000
        });

    }

    const onchangeStatus = (e, item, index) =>
    {

        setisChangeIndex(index)
        setValueStatus(e)
        setisChangeData(!isChangeData)

    }
    const onChangeCheck = (e) =>
    {
        // Notification.warnning({ content: "Heelo", title: "Tesst", icon: "" })
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
    const onChangeSelectNumPages = (e) =>
    {
        setValueSelectPage(e)

    }
    const OnchangePage = (e, i) =>
    {
        setCurrentPage(i)

    }
    const OnchangePageNext = (e, i) =>
    {
        setCurrentPage(i)

        console.log('====================================');
        console.log(i);
        console.log('====================================');

    }
    const OnchangePagePre = (e, i) =>
    {
        console.log('====================================');
        console.log(i);
        console.log('====================================');
        setCurrentPage(i)

    }


    return (

        <div className="HomeContainer">

            {/* <button onClick={() =>
            {
                Notification.primary({
                    content: "Heelo",
                    icon: <img src='images/ic_question.svg' className='icon_' />,
                    action: <button className='reset_btn'
                        style={{
                            background: "#D8D7D7",
                            borderRadius: "3px",
                            width: "68px",
                            height: "28px",

                        }}>Hoàn tác</button>,
                    isAutoHide: true,
                    ishide: false,
                });
            }}>
                check noti perimary
            </button>

            <button onClick={() =>
            {
                Notification.success({
                    content: "Heelo",
                    icon: <img src='images/ic_check_success.svg' className='icon_' />,
                    action: <button className='reset_btn'
                        style={{
                            background: "#D8D7D7",
                            borderRadius: "3px",
                            width: "68px",
                            height: "28px",

                        }}>Hoàn tác</button>,
                    isAutoHide: true,
                    ishide: false,
                    isTimeout: 1500

                });
            }}>
                check noti warrning
            </button> */}
            <Table
                Colums={Colums}
                DataRow={DataRowShow}
                ischeckbox={true}
                isboder={false}
                onChangeCheck={onChangeCheck}
                WrapperStyle={{
                    height: "528px"
                }}
            />
            <Pagination style={{ marginTop: "5px" }}
                Options={OptionsPagi}
                OnChangeSelectNumPages={onChangeSelectNumPages}

                ValueSelectLimit={ValueSelectLimit}
                CurrentPage={CurrentPage}
                ShowStatus={true}
                LimitButton={10}
                OnclickButtonChangePage={OnchangePage}
                ShowNextPre={true}
                OnclickButtonNext={OnchangePageNext}
                OnclickButtonPre={OnchangePagePre}
                TotalRecord={TotalRecord}
            />
        </div>
    )
}
export default SupplierContainer;