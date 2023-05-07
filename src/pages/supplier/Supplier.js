import React from 'react';
import { Route, Router, Switch, useRouteMatch, useHistory, Redirect } from 'react-router';
import CustomRoute from 'router/CustomRoute';
import { ProtectedRoute } from 'router/ProtectedRoute';
import RouterPath from 'router/RouterPath';

import Search from 'shared/components/Search/Search';

import SupplierContainer from 'shared/containers/supplier/SupplierContainer';
import "./style.scss"

function Supplier(props)
{

    // let match = useRouteMatch("/nhacungcap");
    let history = useHistory();

    const { routes } = props;
    const paths = routes.map(x =>
    {
        x.path = RouterPath[x.id] ?? '';
        return x.path
    });

    return (
        <div className="Supplier">
            Supplier
            <Route path={paths} exact={true} children={
                <Switch>
                    {

                        routes.map((route, index) =>
                        {

                            route.path = RouterPath[route.id] ?? '';
                            return route?.guards?.length > 0 ? <ProtectedRoute
                                key={index}
                                path={route.path}
                                route={route}
                            >
                                {route.component}
                            </ProtectedRoute > : <CustomRoute
                                key={index}
                                path={route.path}
                                route={route}>
                                {route.component}
                            </CustomRoute>
                        })
                    }
                    <Route render={(props) => (
                        <SupplierContainer {...props} />
                    )} />
                    {/* <Redirect to="/nhacungcap/danhsach" /> */}
                </Switch>} />

            {/* <div className='content'>

                <Search />
                <div className='tables'>
                    <SupplierContainer {...props} />
                </div>
            </div> */}
        </div>
    )
}

export default Supplier;