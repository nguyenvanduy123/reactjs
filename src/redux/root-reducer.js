/**
 * ****************************************************************************
 * @description     :   Combinie all reducers on app
 * @created at      :   2020/12/03
 * @created by      :   QuyPN - quy.pham@toploop.co
 * @package         :   dashlite-admin-react
 * @copyright       :   Copyright (c) TOPLOOP
 * @version         :   1.0.0
 * ****************************************************************************
 */

/**
 * import libraries
 */
import { combineReducers } from 'redux';
import AppReducer from './app/reducer';

/**
 * Combinie all reducers on app
 * -----------------------------------------
 * @author : QuyPN - 2020/12/03 - create
 * @access : public
 */
const rootReducer = combineReducers({
    App: AppReducer,
});

export default rootReducer;
