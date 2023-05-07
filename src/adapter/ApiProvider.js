import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { setupInterceptersTo } from './AxiosConfig'

const BASE_URL = process.env.REACT_APP_API_URL

const api = setupInterceptersTo(
    axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': process.env.REACT_APP_API_KEY,
            'x-requestid': uuidv4(),
            // đạt test
            'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODhjYzYzMGU0ZWY5MzE2NmI0YjhkNTdiYmM5YjFmNjM3MWJmZjFhYTAzYjEyNTUxMjcwMDJjYzViZjJiMmU4YTdlMDdkNjE4ZmY1ZWNmOGMiLCJpYXQiOjE2ODI0NDI4OTMuMTc4NjMzLCJuYmYiOjE2ODI0NDI4OTMuMTc4NjQxLCJleHAiOjE3MTQwNjUyOTMuMTY0MDg2LCJzdWIiOiIxNCIsInNjb3BlcyI6W119.Nk0w4Q9tHSrWLpOcewMPtTc9HXE8XOmCWSsbUmWp_KwNix-UmtO0F_jBEJMSpxgADb-Bgw-Qg--qtCfgzqnnUH0hUGpJwrgLnHdu1ff40xl0kWOP6FRheKd7gFwdfc9Vq4tDQ8p-m2HnT-18jy1YIYcCE-dD8hyHv9R8foE9rAXjRDb1p-mGWIhc4RJ2IaQdDEHhA6fxBK-Mwk67hDqKKL-93DQrv-_1tzgUkTdImzHDss3bcqpRoaSTauLtRIGEZhK0v90cgdKmh-ET7x-4ZI5W7m9-NuiBSkaJklWAJyIkB--uig9yWyzR0eSMfRHLh02YPGP2XG9XTA75nfYXxiR1LovoE5VrISfhhk8l2iiK7vT7KOZ6wVejBbOyB_TJKipDFWWe-tvhtmwlRqh_8_GGsNyH1UFRyLxwL09Bh2sd2QiLZkrnqMgCb6DiLecc3FaU2aSK_NV-_Lwo6lZWLY0TXKEJp5r0sgF4jQEfnHdqjPw5rlDqJ7RQ9D5u2yGABSt42TO2_6c4Q8J2e5bMBpeJDjCubecN4hVZ4U5sSM4MZy9M6tLwFe0rPGLZTQ4DXFBeN_RcLoN87S2YxpmTFjP-vj_G-ZkahB-EX_i5lXzEGkyUWSMy70DxSyKwR73sFyxGEvt-1Ue0uGfPBrV-k8D9res5yd9Y9tiFv4biB5g"
        },
    }),
)

export const fetchAll = (path, params) =>
{
    return api
        .get(`${BASE_URL}/${path}`, { params })
        .then((resp) => resp.data)
        .catch((error) => console.log(error))
}

export const fetchSingle = (path, id) =>
{
    return api
        .get(`${BASE_URL}/${path}/${id}`)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const post = (path, model) =>
{
    return api
        .post(`${BASE_URL}/${path}`, model)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const patch = (path, model) =>
{
    return api
        .patch(`${BASE_URL}/${path}`, model)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}

export const remove = (path, id) =>
{
    return api
        .delete(`${BASE_URL}/${path}/${id}`)
        .then((resp) => resp.data)
        .catch((error) => { console.log(error); throw error })
}
export const request = ({ url = '', method = 'GET', data = {}, params = {}, responseType = "json" }) =>
{
    return api
        .request({
            url: url,
            method: method,
            data: data,
            params: params,
            responseType: responseType
        })
        .then((resp) =>
        {
            // console.log("resp.data",resp.data)
            return resp.data
        })
        .catch((error) => { console.log(error); throw error })
}