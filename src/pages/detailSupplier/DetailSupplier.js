import React from 'react';

import Search from 'shared/components/Search/Search';
import DetailSupplierContainer from 'shared/containers/detailSupplierContainer/DetailSupplierContainer';


import "./style.scss"

function DetailSupplier(props)
{

    return (
        <div className="DetailSupplier">

            <DetailSupplierContainer />
        </div>
    )
}

export default DetailSupplier;