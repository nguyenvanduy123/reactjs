import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router';
import CustomRoute from 'router/CustomRoute';
import { ProtectedRoute } from 'router/ProtectedRoute';
import RouterPath from 'router/RouterPath';
import Routes from 'router/Routes';
import Menu from 'shared/components/Menu/Menu';
import Search from 'shared/components/Search/Search';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from 'shared/components/Topbar/Topbar';
// import HomeContainer from 'shared/containers/home/HomeContainer';
import "./style.scss"

function HomePage(props)
{

    const { routes } = props
    const paths = routes.map(x =>
    {
        x.path = RouterPath[x.id] ?? '';
        return x.path
    });

    return (
        <div className="HomePage">


            <Route path={paths} exact={true} children={<Switch>
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
            </Switch>} />

            {/* <Layout routes={routes} /> */}

        </div>

    )
}

export default HomePage;