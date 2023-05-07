/**
 * ****************************************************************************
 * @description     :   Export all midleware function of saga
 * @created at      :   2020/12/03
 * @created by      :   QuyPN - quy.pham@toploop.co
 * @package         :   dashlite-admin-react
 * @copyright       :   Copyright (c) TOPLOOP
 * @version         :   1.0.0
 * ****************************************************************************
 */

/**
 * imprt libraries
 */
import { all } from 'redux-saga/effects'

/**
 * impoprt saga of other components
 */
import AppSaga from './app/saga'

export default function* rootSaga () {
    yield all([
        AppSaga(),
    ])
}
