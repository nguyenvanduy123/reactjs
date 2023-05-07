import React from 'react';

import Search from 'shared/components/Search/Search';
import AddSupplierContainer from 'shared/containers/addSupplierContainer/AddSupplierContainer';

import "./style.scss"

function AddSupplier(props)
{

    return (
        <div className="AddSupplier">
            <AddSupplierContainer />
        </div>
    )
}

export default AddSupplier;