import { Route } from 'react-router-dom';

function CustomRoute(props)
{


    return (

        <Route path={props.route.path} exact  {...props.rest}>
            {props.children}
        </Route>
    )
}
export default CustomRoute;