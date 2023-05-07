import { PlaceHolder } from '@findxdn/erp-theme';
import React, { useState, useEffect, useRef } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import Dropdown from '../Dropdown/Dropdown';
import InputSeach from '../InputSeach/InputSeach';

import "./style.scss"
function Table(props)
{

    const { Colums, DataRow, isboder, ischeckbox, onChangeCheck, WrapperStyle } = props
    // const [Position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, });
    // const [isClick, setIsClick] = useState(false);

    // const [Options, setOptions] = useState([
    //     { value: 1, text: "trạng thái 1" },
    //     { value: 2, text: "trạng thái 2" },
    //     { value: 3, text: "trạng thái 3" }
    // ]);
    // const [ValueStatus, setValueStatus] = useState(false);
    const [Values, setValues] = useState([]);
    const [check, setCheck] = useState(false);
    // const [ValueSearch, setValueSearch] = useState(false);
    // const popRef = useRef()
    useEffect(() =>
    {
        onChangeCheck(Values);
    }, [check]);

    const onChangeCheckbox = (e, value, isall) =>
    {

        let result = [];
        if (!isall) {

            if (e.target.checked) {
                if (!Values.includes(value)) {
                    Values.push(value)
                    result = Values
                }




            } else {
                result = Values.filter(item =>
                {

                    return value !== item
                })
            }

        } else {
            setValues([])
            if (e.target.checked) {
                (DataRow || []).map((item, index) =>
                {
                    result.push(item.id)
                    // if (!Values.includes(item.id)) {
                    //     result.push(item.id)
                    // }
                })
            } else {
                result = []
            }

        }

        setValues(result)
        setCheck(!check)
    }

    return (
        <div className={`Table `} id='table' style={{ ...WrapperStyle }}  >
            <table className='table_standard'
                cellPadding={0}
                cellSpacing={0}
                border={isboder ? 1 : 0}
            >
                <thead>
                    <tr className='color_standar' >

                        {Colums && Colums.map((item, index) =>
                        {

                            return <th key={index} style={{ ...item.style }}>
                                {ischeckbox && index <= 0 && <div style={{ display: "flex" }}>

                                    <CheckBox
                                        id={"all_check"}
                                        value={"all_check"}
                                        style={{
                                            marginRight: "10px", width: "20px",
                                            height: "20px"
                                        }}
                                        onChange={(e) => onChangeCheckbox(e, "all_check", true)}
                                        checked={Values.length === DataRow.length}
                                    >


                                    </CheckBox>
                                    {/* <input type="checkbox" id='' value={item.id} style={{ marginRight: "10px" }} onChange={(e) => onChangeCheckbox(e, item.id, true)} /> */}

                                    {item.title}
                                </div>}
                                {!ischeckbox || index > 0 && item.title}
                            </th>
                        })}


                    </tr>
                </thead>
                <tbody>

                    {DataRow && DataRow.map((item, index) =>
                    {



                        return <tr key={index} style={{ backgroundColor: Values.includes(item.id) ? "#FBFAF4" : "#FFFFFF" }}>

                            {Colums && Colums.map((el, i) =>
                            {

                                // if (item[el.dataIndex]) {
                                return <td key={i} style={{ ...el.style }} >

                                    {ischeckbox && i <= 0 && <div style={{ display: "flex" }}>
                                        <CheckBox id={item.id} value={item.key}
                                            style={{
                                                marginRight: "10px",
                                                width: "20px",
                                                height: "20px"
                                            }}
                                            onChange={(e) => onChangeCheckbox(e, item.id, false)} checked={Values.includes(item.id)} >

                                        </CheckBox>


                                        {!el.render && item[el.dataIndex]}
                                        {el.render && el.render(item[el.dataIndex], item)}
                                    </div>}

                                    {(!ischeckbox || i > 0) && !el.render && item[el.dataIndex]}
                                    {(!ischeckbox || i > 0) && el.render && el.render(item[el.dataIndex], item, index)}
                                </td>
                                // }


                            })}
                        </tr>;
                    })}

                </tbody>
            </table>
        </div >
    )
}


export default Table;