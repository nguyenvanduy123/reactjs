import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
// import { useLocation } from 'react-router-dom';
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import FormItemInput from 'shared/components/FormItemInput/FormItemInput';
import FormCustom from 'shared/components/FormCustom/FormCustom';
import Bottom from 'shared/components/Bottom/Bottom';
import ButtonDropdown from 'shared/components/ButtonDropdown/ButtonDropdown';
import FormItem from 'shared/components/FormItem/FormItem';
import Validator from 'utils/Validator';


function AddSupplierContainer(props)
{
    let location = useLocation();
    let history = useHistory();
    let { id } = useParams();
    const dispatch = useDispatch()
    const { data, detail, loading } = useSelector(state => state.App.superliData)
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const [record, setRecord] = useState({});
    const [IsaddNew, setIsaddNew] = useState(false);

    const [OptionCates, setOptionCates] = useState([
        { value: "Ngành may mặc", text: "Ngành may mặc" },
        { value: "Ngành ăn mặc", text: "Ngành ăn mặc" },
    ]);
    const [OptionCN, setOptionCN] = useState([
        { value: "0123456", text: "0123456" },
        { value: "7894567", text: "7894567" },
    ]);
    const [OptionProvince, setOptionProvince] = useState([
        { value: "Đà Nẵng", text: "Đà Nẵng" },
        { value: "Quảng nam", text: "Quảng nam" },
        { value: "Thành phố Hồ Chí Minh", text: "Thành phố Hồ Chí Minh" },
        { value: "Đồng Nai", text: "Đồng Nai" },
        { value: "Lâm Đồng", text: "Lâm Đồng" },
    ]);
    const [OptionDistrict, setOptionDistrict] = useState([
        { value: "Cẩm lệ", text: "Cẩm Lệ" },
        { value: "Liên Chiểu", text: "Liên Chiểu" },
        { value: "Hòa khánh", text: "Hòa khánh" },
        { value: "Hòa Vang", text: "Hòa Vang" },
        { value: "Hòa Bắc", text: "Hòa Bắc" },
    ]);
    const [OptionWars, setOptionOptionWars] = useState([
        { value: "Hòa Thuận Đông", text: "Hòa Thuận Đông" },
        { value: "Hòa Thuận Tây", text: "Hòa Thuận Tây" },
        { value: "Hòa Thuận Nam", text: "Hòa Thuận Nam" },
        { value: "Hòa Thuận Bắc", text: "Hòa Thuận Bắc" },

    ]);
    const [Optionstatus, setOptionstatus] = useState([
        { value: 1, text: "Giao dịch" },
        { value: 2, text: "Tạm dừng" },

    ]);

    useEffect(() =>
    {

        // set data row
        if (id) {
            dispatch({
                type: AppAction.FETCH_GET_DATA_ID,
                payload: {
                    data: id
                }
            })
        } else {
            dispatch({
                type: AppAction.FETCH_GET_DATA,
                payload: {
                    data: {}
                }
            })
        }


        // setDataRow(tmpRow);


    }, [])
    useEffect(() =>
    {

        if (id && data[0]) {
            setRecord(data[0])
        }

    }, [data, id])
    useEffect(() =>
    {

        if (id && detail) {
            setRecord(detail)
        }

    }, [detail])
    useEffect(() =>
    {

        if (loading && IsaddNew) {
            alert("Đã lưu");
            setIsaddNew(false)
        }

    }, [loading])

    const onhandleChangeText = (e, type = "") =>
    {
        if (e.target) {
            let name = e.target.name;
            let value = e.target.value;
            setRecord({ ...record, [name]: value })
        } else {
            if (type) {
                setRecord({ ...record, [type]: e })
            }

        }

    }
    const validate = () =>
    {
        // alert(Validator.required(record.Name));

        if (Validator.required(record.Name) || Validator.required(record.phone) || Validator.required(record.codeNCC) || Validator.required(record.province) || Validator.required(record.district) || Validator.required(record.war)) {
            alert(Validator.required(record.name));
            return;
        }
        return true

    }
    const saveRecord = () =>
    {
        if (!validate()) {
            return;
        }
        if (id) {
            dispatch({
                type: AppAction.FETCH_PUT_DATA,
                payload: {
                    data: record
                }
            })
        } else {
            dispatch({
                type: AppAction.FETCH_POST_DATA,
                payload: {
                    data: record
                }
            })
        }

        setIsaddNew(true)
    }

    const getStatusText = (e) =>
    {

        if (!e) {
            return
        }
        return (Optionstatus.filter(item =>
        {
            return e === item.value
        }))[0].text
    }
    return (

        <div className="AddSupplierContainer" id='add_supplier_container'>

            <FormCustom
                title="Thông tin nhà cung cấp"
            >

                <FormItemInput
                    label="Tên nhà cung cấp"
                    placeholder="Tên nhà cung cấp"
                    name="Name"
                    isRequired={true}
                    value={record.Name}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "Name")}
                />
                <FormItem
                    label="Danh mục"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}>
                    <div style={{
                        // height: 
                        width: "100%"

                    }}>
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Danh mục"} id="cate" name="cate"
                            Options={OptionCates}
                            onChange={(e) => { onhandleChangeText(e, "cate") }}
                            value={record.cate}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{record.cate ?? "Danh mục"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Danh mục"
                    placeholder="Tên nhà cung cấp"
                    name="cate"
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "cate")}
                /> */}

                <FormItemInput
                    label="Số điện thoại"
                    placeholder="Tên nhà cung cấp"
                    name="phone"
                    value={record.phone}
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "phone")}
                />

                <FormItemInput
                    label="Mã codeNCC"
                    placeholder="Mã codeNCC"
                    name="codeNCC"
                    value={record.codeNCC}
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "codeNCC")}
                />
                <FormItem
                    label="Công nợ"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}>
                    <div style={{
                        // height: 
                        width: "100%"

                    }}>
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Công nợ"} id="codeCN" name="codeCN"
                            Options={OptionCN}
                            onChange={(e) => { onhandleChangeText(e, "codeCN") }}
                            value={record.codeCN}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{record.codeCN ?? "Công nợ"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Công nợ"
                    placeholder="Tên nhà cung cấp"
                    name="codeCN"
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "codeCN")}
                /> */}
                <FormItemInput
                    label="Email"
                    placeholder="Email cung cấp"
                    name="email"
                    value={record.email}
                    // isRequired={false}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "email")}
                />
                <FormItem
                    label="Tỉnh/ Thành phố"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}
                    isRequired={true}
                >
                    <div style={{
                        // height: 
                        width: "100%"

                    }}>
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Tỉnh/ Thành phố"} id="province" name="province"
                            Options={OptionProvince}
                            onChange={(e) => { onhandleChangeText(e, "province") }}
                            value={record.province}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{record.province ?? "Tỉnh/ Thành phố"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Tỉnh/ Thành phố"
                    placeholder="Tỉnh/ Thành phố"
                    name="province"
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "province")}
                /> */}
                <FormItem
                    label="Quận/ Huyện"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}
                    isRequired={true}
                >
                    <div style={{
                        // height: 
                        width: "100%"

                    }}>
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Quận/ Huyện"} id="district" name="district"
                            Options={OptionDistrict}
                            onChange={(e) => { onhandleChangeText(e, "district") }}
                            value={record.district}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{record.district ?? "Quận/ Huyện"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Quận/ Huyện"
                    placeholder="Quận/ Huyện"
                    isRequired={true}
                    name="district"
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "district")}
                /> */}
                <FormItem
                    label="Phường/ Xã"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}
                    isRequired={true}
                >
                    <div style={{
                        // height: 
                        width: "100%"

                    }}

                    >
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Phường/ Xã"} id="war" name="war"
                            Options={OptionWars}
                            onChange={(e) => { onhandleChangeText(e, "war") }}
                            value={record.war}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{record.war ?? "Phường/ Xã"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Phường/ Xã"
                    placeholder="Phường/ Xã"
                    name="war"
                    isRequired={true}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "war")}
                /> */}


                <FormItemInput
                    label="Địa chỉ cụ thể"
                    placeholder="Địa chỉ cụ thể"
                    name="address"
                    value={record.address}
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "address")}
                // isRequired={true}
                />
                <FormItem
                    label="Trạng thái"
                    style={{
                        // width: "346px", display: "flex",
                        // flexDirection: "column",

                    }}>
                    <div style={{
                        // height: 
                        width: "100%"

                    }}>
                        <ButtonDropdown className="_select_input inputs_item" placeholder={"Trạng thái"} id="status" name="status"
                            Options={Optionstatus}
                            onChange={(e) => { onhandleChangeText(e, "status") }}
                            value={record.status}
                            styleInput={{
                                padding: 0,
                                height: "32px"
                            }}

                            icon={<img src='images/ic_dropdown_small.svg' className='icon_' />}
                            isHover={false}
                        >
                            <span style={{
                                width: "100%", textAlign: "left", display: "flex",
                                alignItems: "center"
                            }}>{getStatusText(record.status) ?? "Trạng thái"}</span>
                        </ButtonDropdown>
                    </div>

                </FormItem>
                {/* <FormItemInput
                    label="Trạng thái"
                    placeholder="Trạng thái"
                    name="status"
                    style={{ width: "346px" }}
                    onChange={(e) => onhandleChangeText(e, "status")}
                // isRequired={true}
                /> */}
                <FormItemInput
                    label=""
                    style={{ width: "346px" }}
                    // isRequired={true}
                    hidden
                />

            </FormCustom>
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
                        history.goBack()
                    }}>Huỷ bỏ</button>
                    <button className='reset_btn stand_radius success_btn  text-white' onClick={() =>
                    {
                        saveRecord()
                    }}>Lưu</button>
                </div>
            </Bottom>
        </div >
    )
}
export default AddSupplierContainer;