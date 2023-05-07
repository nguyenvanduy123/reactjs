import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory';


function* watchSample1()
{

    yield takeEvery(actions.FETCH_SAMPLE_1, function* (payload)
    {
        
        try {
            const response = yield call(() =>
                factories.fetchSample(payload),
            );

            yield put({
                type: actions.FETCH_SAMPLE_1_SUCCESS,
                payload: response.Data,
            });
            
        } catch (error) {

        } finally {
        }
    });
    
}
function* watchSample2()
{
    
    yield takeEvery(actions.FETCH_SAMPLE_2, function* (payload)
    {
        try {
            const response = yield call(() =>
                factories.updateSample(payload),
            );
            yield put({
                type: actions.FETCH_SAMPLE_2_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}


function* watchGetData()
{

    yield takeEvery(actions.FETCH_GET_DATA, function* (payload)
    {

        try {
            const response = yield call(() =>
                factories.fetchGetData(payload),
            );

            yield put({
                type: actions.FETCH_GET_DATA_SUCCESS,
                payload: response.Data,
            });

        } catch (error) {

        } finally {
        }
    });

}
function* watchGetDataId()
{

    yield takeEvery(actions.FETCH_GET_DATA_ID, function* (payload)
    {

        try {
            const response = yield call(() =>
                factories.fetchGetDataId(payload),
            );

            yield put({
                type: actions.FETCH_GET_DATA_ID_SUCCESS,
                payload: response.Data,
            });

        } catch (error) {

        } finally {
        }
    });

}

function* watchSetDataSearch()
{

    yield takeEvery(actions.FETCH_SET_DATA_SEARCH, function* (payload)
    {

        try {
            const response = yield call(() =>
                factories.fetchPostData(payload),
            );
            console.log('====================================');
            console.log("responseresponseresponse", response);
            console.log('====================================');
            yield put({
                type: actions.FETCH_SET_DATA_SEARCH_SUCCESS,
                payload: response.Data,
            });

        } catch (error) {

        } finally {
        }
    });

}
function* watchDeleteData()
{

    yield takeEvery(actions.FETCH_PUT_DATA, function* (payload)
    {

        try {
            const response = yield call(() =>
                factories.fetchPutData(payload),
            );

            yield put({
                type: actions.FETCH_PUT_DATA_SUCCESS,
                payload: response.Data,
            });



        } catch (error) {

        } finally {
        }
    });

}


function* watchPostData()
{

    yield takeEvery(actions.FETCH_POST_DATA, function* (payload)
    {

        try {
            const response = yield call(() =>
                factories.fetchPostData(payload),
            );

            yield put({
                type: actions.FETCH_POST_DATA_SUCCESS,
                payload: response.Data,
            });

        } catch (error) {

        } finally {
        }
    });

}
// function* waitGenerator(ms)
// {
//     yield new Promise(resolve => setTimeout(resolve, ms));
//     console.log("Done waiting!");
// }
export default function* AppSaga()
{
    yield all([
        fork(watchSample1),
        fork(watchSample2),
        fork(watchGetData),
        fork(watchDeleteData),
        fork(watchGetDataId),
        fork(watchSetDataSearch),
        fork(watchPostData),
    ]);
}
