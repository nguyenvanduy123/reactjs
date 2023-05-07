import React from 'react';
import CommonPopup from 'shared/components/common/popup/CommonPopup';
import MainLayout from 'shared/components/layout/MainLayout';
import { FIRST_POPUP, SECOND_POPUP } from 'utils/EventRegister';
import RouterPath from './RouterPath';

function CustomApp (props) {
    return (
        <>
            {props.children}
        </>
    )
}

export default CustomApp
