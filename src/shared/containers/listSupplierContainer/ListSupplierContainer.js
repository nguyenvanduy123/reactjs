import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppAction from 'redux/app/action';
import { useLocation, useHistory, Link } from 'react-router-dom';

import "./style.scss";
import Table from 'shared/components/Table/Table';
import ButtonDropdown from 'shared/components/ButtonDropdown/ButtonDropdown';
import Popover from 'shared/components/Popover/Popover';
import Pagination from 'shared/components/Pagination/Pagination';
import Notification from 'shared/components/Notification/Notification';
import Search from 'shared/components/Search/Search';
import TableLoader from 'shared/components/loader/table-loader/TableLoader';
import { PlaceHolder } from '@findxdn/erp-theme';
import TableLoaderCustom from 'shared/components/loader/table-loaderCustom/TableLoaderCustom';
import RouterPath from 'router/RouterPath';
import InputSeach from 'shared/components/InputSeach/InputSeach';
import Dropdown from 'shared/components/Dropdown/Dropdown';
import * as XLSX from 'xlsx'
function SupplierContainer(props)
{

    let history = useHistory();
    const dispatch = useDispatch()
    const { data, detail, search, loading } = useSelector(state => state.App.superliData)
    const [Options, setOptions] = useState([
        { value: 1, text: "Giao dịch" },
        { value: 2, text: "Tạm dừng" },

    ]);

    const [OptionsPagi, setOptionsPagi] = useState([]);

    const [ValueSelectLimit, setValueSelectPage] = useState({});

    const [ValueStatus, setValueStatus] = useState({ value: "", text: "chọn trạng thái" },);
    const [CurrentPage, setCurrentPage] = useState(1);
    // const [TotalPage, setTotalPage] = useState(3);
    const [TotalRecord, setTotalRecord] = useState(0);
    const [isChangeData, setisChangeData] = useState(false);

    const [LimitOption, setLimitOption] = useState(10);
    const [LimitRecord, setLimitRecord] = useState(10);

    const [ValueSearch, setValueSearch] = useState({ text: "", status: "", address: "" });
    const [ChangeStatusSearch, setChangeStatusSearch] = useState({});
    const [ChangeAddress, setChangeAddress] = useState({});
    const [isreset, setIsreset] = useState(false);
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
                return <Link to={RouterPath["DETAIL"].replace("/:id", "/") + `${record.id}`} style={{ color: "#0054E1" }
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
                    styleInput={{
                        width: "98px",
                        height: "26px",
                        padding: "5px 4px"
                    }}
                    icon={<img src='images/ic_dropdown_white.svg' className='icon_' style={{ width: "14px", height: "14px", marginLeft: "5px" }} />}
                    isHover={false}
                >
                    <button className='reset_btn text-white font-weigth-600' style={{
                        fontSize: "12px"
                    }}>{getStatusText(text)}</button>
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
                            <button className='reset_btn' onClick={() =>
                            {
                                history.push(`${RouterPath["EDIT"].replace("/:id", "/")}${record.id}`)
                            }}>
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
                    // left={0}
                    bottom={"0"}
                    right={"0"}
                >
                    <button className='reset_btn' style={{ cursor: "pointer" }}><img src='images/ic_seting.svg' className='icon_' style={{ width: "24px", height: "24px" }} /></button>
                </Popover>
            }
        }
    ]);


    useEffect(() =>
    {
        setValueSearch({ ...search })
        if (search.status) {

            setChangeStatusSearch((Options || []).filter(item =>
            {

                return item.value == search.status;
            })?.[0])
        }
        if (search.address) {
            setChangeStatusSearch((Options || []).filter(item =>
            {
                return item.value == search.address;
            })?.[0])
        }
       
    }, [search])
    useEffect(() =>
    {

        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: { s: search ? { ...search } : { ...ValueSearch }, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
            }
        })
       
    }, [])

    useEffect(() =>
    {

        if (data) {

            if (data?.totalrecord) {
                setTotalRecord(data?.totalrecord)
            } else {
                setTotalRecord(0);
            }

            if (data.data?.length > 0) {
                setDataRowShow(data.data ?? [])
            } else {
                setDataRowShow([])
            }
            if (data?.totalrecord) {
                setOptionsPagi(data?.Optionlimit);
            } else {
                setOptionsPagi([]);
            }



        }
        // setisfirst(isfirst ? false : isfirst)
        setisChangeData(!isChangeData)
    }, [data])
    useEffect(() =>
    {

        if (detail) {
            dispatch({
                type: AppAction.FETCH_GET_DATA,
                payload: {
                    data: { s: search ? { ...search } : { ...ValueSearch }, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
                }
            })
        }


    }, [detail])
    useEffect(() =>
    {
        if (isreset) {

            dispatch({
                type: AppAction.FETCH_GET_DATA,
                payload: {
                    data: { s: { ...ValueSearch }, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
                }
            })

            setIsreset(false)
        }


    }, [ValueSearch, ChangeAddress, ChangeStatusSearch, isreset])
    useEffect(() =>
    {
        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: { s: search ? { ...search } : { ...ValueSearch }, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
            }
        })
    }, [CurrentPage, LimitRecord])

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
            type: AppAction.FETCH_PUT_DATA,
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
            type: AppAction.FETCH_PUT_DATA,
            payload: {
                data: item
            }
        })
        // setisChangeData(!isChangeData);
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

        dispatch({
            type: AppAction.FETCH_PUT_DATA,
            payload: {
                data: { ...item, status: e }
            }
        })


        setValueStatus(e)
        // setisChangeData(!isChangeData)

    }
    const onChangeCheck = (e) =>
    {
        // Notification.warnning({ content: "Heelo", title: "Tesst", icon: "" })

    }
    const onChangeSelectNumPages = (e) =>
    {

        setLimitRecord(e?.value)


    }
    const OnchangePage = (e, i) =>
    {
        setCurrentPage(i)

    }
    const OnchangePageNext = (e, i) =>
    {
        setCurrentPage(i)


    }
    const OnchangePagePre = (e, i) =>
    {

        setCurrentPage(i)

    }
    const onchangeSearch = (e, type) =>
    {


        if (e.target) {
            setValueSearch({ ...ValueSearch, [type]: e.target.value });
        } else {
            setValueSearch({ ...ValueSearch, [type]: e });
        }


    }
    const onChangeSearchStatus = (e) =>
    {
        setValueSearch({ ...ValueSearch, status: e.value });
        setChangeStatusSearch(e);

    }
    const onChangeSearchAddress = (e) =>
    {
        setValueSearch({ ...ValueSearch, address: e.value });
        setChangeAddress(e);
    }
    const onHandleSearch = () =>
    {
        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: { s: { ...ValueSearch }, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
            }
        })
    }
    const resetSearch = () =>
    {
        setValueSearch({ text: "", status: "", address: "" });
        setChangeAddress({});
        setChangeStatusSearch({})
        setIsreset(true)
        // dispatch({
        //     type: AppAction.FETCH_GET_DATA,
        //     payload: {
        //         data: { ...ValueSearch, limit: LimitRecord, LimitOption: LimitOption, currentpage: CurrentPage }
        //     }
        // })
    }
    // Notification.primary({
    //     content: "Heelo",
    //     icon: <img src='images/ic_question.svg' className='icon_' />,
    //     action: <button className='reset_btn'
    //         style={{
    //             background: "#D8D7D7",
    //             borderRadius: "3px",
    //             width: "68px",
    //             height: "28px",

    //         }}>Hoàn tác</button>,
    //     isAutoHide: true,
    //     ishide: false,
    // });
    const ExportExel = () =>
    {
        const workbook = XLSX.utils.book_new();
        const data = [];
        DataRowShow.map((r, i) =>
        {
            const col = {}
            Colums.map((c, j) =>
            {
                if (c.dataIndex == 'status') {
                    col[c.title] = getStatusText(r[c.dataIndex])
                } else {
                    col[c.title] = r[c.dataIndex]
                }

            })
            data.push(col)
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "test");
        XLSX.writeFile(workbook, "nhacungcap.xlsx", { bookType: "xlsx" });

    }
    return (

        <div className="ListSupplierContainer">
            <div className={`Search stand_radius`} id='search' >
                <div className='inputs_'>
                    <InputSeach className="search_input inputs_item"
                        id="text"
                        name="text"
                        placeholder={"Tìm kiếm mã NCC, tên NCC, email, "}
                        onChange={(e) => onchangeSearch(e, "text")}
                        value={ValueSearch.text}
                    />
                    <Dropdown className="_select_input inputs_item" placeholder={"Trạng thái "} id="status" name="status"
                        Options={Options}
                        onChange={onChangeSearchStatus}
                        value={ChangeStatusSearch?.text}
                        isHover={true}
                        icon={<img src='images/ic_dropdown.svg' className='icon_' />}
                    />

                    <Dropdown className="_select_input inputs_item" placeholder={"Địa chỉ "} id="address" name="address"
                        Options={Options}
                        onChange={onChangeSearchAddress}
                        value={ChangeAddress?.text}
                        isHover={true}
                        icon={<img src='images/ic_dropdown.svg' className='icon_' />}
                    />
                </div>

                <div className='action_btn '>
                    <button className='reset_btn stand_radius  secondary_btn text-secondary' style={{
                        width: "106px",

                    }} onClick={resetSearch}>
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
                    <Popover
                        title={""}
                        body={
                            <div className='btn_action_table' style={{ display: "flex", flexDirection: "column" }}>
                                <button className='reset_btn' style={{ justifyContent: "center", margin: 0 }} onClick={() =>
                                {
                                    ExportExel()
                                }}>
                                    {/* <img src='images/ic_edit.svg' className='icon_' style={{ width: "16px", height: "16px" }} /> */}
                                    <span className='text-success'>Xuất exel</span>
                                </button>

                            </div>
                        }
                        style={{
                            width: "",
                            height: "auto",
                        }}
                        isHover={true}
                        right={"0"}
                        bottom={"0"}
                    >
                        <button className='reset_btn stand_radius warning_btn ' style={{
                            width: "32px",
                            height: "32px"

                        }} >
                            <img src='images/ic_dot.svg' className='icon_ ' />
                        </button>

                    </Popover>

                </div>
            </div>

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
            {/* {
                loading ? <TableLoaderCustom colums={Colums} WrapperStyle={{
                    height: "528px"
                }} /> : <Table
                    Colums={Colums}
                    DataRow={DataRowShow}
                    ischeckbox={true}
                    isboder={false}
                    onChangeCheck={onChangeCheck}
                    WrapperStyle={{
                        height: "528px"
                    }}
                />
            } */}
            {/* {!loading && <Table
                Colums={Colums}
                DataRow={DataRowShow}
                ischeckbox={true}
                isboder={false}
                onChangeCheck={onChangeCheck}
                WrapperStyle={{
                    height: "528px"
                }}
            />} */}

            <Pagination style={{ marginTop: "5px" }}
                Options={OptionsPagi}
                OnChangeSelectNumPages={onChangeSelectNumPages}
                LimitOption={LimitOption}
                LimitRecord={LimitRecord}
                LimitButton={10}
                CurrentPage={CurrentPage}
                ShowStatus={true}

                OnclickButtonChangePage={OnchangePage}
                ShowNextPre={true}
                OnclickButtonNext={OnchangePageNext}
                OnclickButtonPre={OnchangePagePre}
                TotalRecord={TotalRecord}
            />
        </div >
    )
}
export default SupplierContainer;