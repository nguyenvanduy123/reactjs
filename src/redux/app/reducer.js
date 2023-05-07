import AppAction from './action';
const tmpRow = [];
for (let i = 1; i < 300; i++) {
    let status = i % 2 === 0 ? 1 : 2;
    tmpRow.push({
        codeNCC: 'NC0000' + i.toString(),
        Name: 'Nhà cung cấp ' + i.toString(),
        cate: "Ngành may mặc",
        code: "322",
        codeCN: "11111202" + i.toString(),
        phone: "0358749335",
        email: "abc123@gmail.com",
        address: "72 Núi Thành, Đà Nẵng",
        province: "Đà Nẵng",
        district: "Hải Châu",
        war: "Hoà Thuận Đông",
        status: status,
        deleted: false,
        id: i

    })

}

let datarender = []

// const dataDefault = tmpRow;
let initialState = {
    dataDefault: tmpRow,
    loadingApp: false,
    loadingAppPopup: false,
    sampleData: {
        loading: false,
        data: {}
    },
    superliData: {
        loading: false,
        data: {},
        search: {},

    }
};

const AppReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case AppAction.LOADING_APP_START:
            return {
                ...state,
                loadingApp: true,
            };
        case AppAction.CLOSE_LOADING_APP:
            return {
                ...state,
                loadingApp: false,
            };
        case AppAction.LOADING_APP_POPUP_START:
            return {
                ...state,
                loadingAppPopup: true,
            };
        case AppAction.CLOSE_LOADING_APP_POPUP:
            return {
                ...state,
                loadingAppPopup: false,
            };
        case AppAction.FETCH_SAMPLE_1:
            return {
                ...state,
                sampleData: {
                    ...state.sampleData,
                    loading: true,
                },
            };
        case AppAction.FETCH_SAMPLE_1_SUCCESS:
            return {
                ...state,
                sampleData: {
                    ...state.sampleData,
                    data: action.payload,
                    loading: false,
                },
            };
        case AppAction.FETCH_GET_DATA:

            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    // data: action.payload,

                    loading: true,
                },
            };
        case AppAction.FETCH_GET_DATA_SUCCESS:
            let s = action.payload.data.s

            let tmpdata = GetData_(state.dataDefault, action.payload.data.limit, action.payload.data.currentpage);
            let Optionlimit = renderOptionlimit(state.dataDefault, action.payload.data.LimitOption);
            let totalrecord = state.dataDefault.length;
            if (s && (s.text || s.status || s.address)) {

                tmpdata = search(state.dataDefault, s);
                Optionlimit = renderOptionlimit(tmpdata, action.payload.data.LimitOption);
                totalrecord = tmpdata.length;
            }
          return {
                ...state,
                superliData: {
                    ...state.superliData,
                    data: { data: tmpdata, Optionlimit: Optionlimit, totalrecord: totalrecord },
                    search: s ? s : state.superliData.search,
                    loading: false,
                },
            };
        case AppAction.FETCH_PUT_DATA:

            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    // data: state.superliData.data,
                    loading: true,
                },
            };
        case AppAction.FETCH_PUT_DATA_SUCCESS:

            // ////////
            let i = 0;
            const dd = state.dataDefault;
            dd.map((item, index) =>
            {
                if (item.id == action.payload.data.id) {
                    i = index
                }
            });
            dd[i] = action.payload.data
            // ////////
            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    // data: dd,
                    detail: dd[i],
                    loading: false,
                },
            };
        case AppAction.FETCH_POST_DATA:

            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    data: state.superliData.data,
                    loading: true,
                },
            };
        case AppAction.FETCH_POST_DATA_SUCCESS:


            return {
                ...state,
                dataDefault: [...state.dataDefault, { ...action.payload.data, id: state.dataDefault.length }],
                superliData: {
                    ...state.superliData,
                    data: [...state.dataDefault, action.payload.data],
                    loading: false,
                },
            };
        case AppAction.FETCH_GET_DATA_ID:

            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    data: state.superliData.data,
                    loading: true,
                },
            };
        case AppAction.FETCH_GET_DATA_ID_SUCCESS:


            return {
                ...state,
                superliData: {
                    ...state.superliData,
                    detail: state.dataDefault.filter(item =>
                    {
                        return parseInt(item.id) == parseInt(action.payload.data);
                    })?.[0],

                    loading: false,
                },
            };

        default:
            return {
                ...state,
            };
    }
};
const renderOptionlimit = (data, limitOption) =>
{
    if (data && limitOption) {
        const result = [];

        const dataLen = data.length;

        for (let i = 1; i < limitOption; i++) {

            const dataPerpage = Math.ceil(((dataLen) / limitOption)) * i

            result.push({ value: dataPerpage, text: dataPerpage });

        }
        return result
    }
    return []
}
const GetData_ = (data, limit, currentpage) =>
{

    if (data && limit && currentpage) {
        const datafil = data.filter(item =>
        {
            return !item.deleted
        })
        const indexOfLastData = currentpage * limit;
        const indexOfFirstData = indexOfLastData - limit;
        const currentData = datafil.slice(indexOfFirstData, indexOfLastData);



        return currentData
    }
    return []
}
const search = (data, s) =>
{


    let result = [];
    if ((s.status && s.status != 3) || s.text) {

        result = data.filter(item =>
        {
            if (!item.deleted) {
                if (s.status && s.text) {

                    return (parseInt(item.status) == parseInt(s.status) &&
                        (item.Name.includes(s.text) ||
                            item.codeNCC.includes(s.text) ||
                            item.code.includes(s.text) ||
                            item.codeCN.includes(s.text) ||
                            item.phone.includes(s.text)
                        ))
                } else if (s.status) {
                    return parseInt(item.status) == parseInt(s.status)
                } else if (s.text) {
                    return (item.Name.includes(s.text) ||
                        item.codeNCC.includes(s.text) ||
                        item.code.includes(s.text) ||
                        item.codeCN.includes(s.text) ||
                        item.phone.includes(s.text)
                    )
                }
            }


        })

    } else {

        result = data
    }


    return result
}
export default AppReducer;
