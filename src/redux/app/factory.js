import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const AppFactory = {
    fetchGetData: async (data) =>
    {
        // const tmpRow = [];

        // for (let i = 1; i < 300; i++) {
        //     tmpRow.push({
        //         codeNCC: 'NC0000' + i.toString(),
        //         Name: 'Nhà cung cấp ' + i.toString(),
        //         cate: "Ngành may mặc",
        //         code: "322",
        //         codeCN: "11111202" + i.toString(),
        //         phone: "0358749335",
        //         email: "abc123@gmail.com",
        //         address: "72 Núi Thành, Đà Nẵng",
        //         province: "Đà Nẵng",
        //         district: "Hải Châu",
        //         war: "Hoà Thuận Đông",
        //         status: 2,
        //         deleted: false,
        //         id: i

        //     })

        // }
        await wait(500);
        return {
            Data: data.payload
        };

    },
    fetchGetDataId: async (data) =>
    {
        await wait(500);

        return {
            Data: data.payload
        };

    },
    fetchPutData: async (data) =>
    {
        await wait(500);
        return {
            Data: data.payload
        };


    },
    fetchPostData: async (data) =>
    {
        await wait(500);
        return {
            Data: data.payload
        };


    },
    fetchSample: (data) =>
    {
        return {
            Data: {}
        };

    },
    updateSample: (data) =>
    {
        return {
            Data: {}
        };
        // return ApiOperation.request({
        //     url: ApiConstants.CREATE_CATEGORY,
        //     method: 'POST',
        //     data: data
        // });
    },
}
function wait(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default AppFactory