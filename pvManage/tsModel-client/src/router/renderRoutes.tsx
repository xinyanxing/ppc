import React from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';
import _ from 'lodash';

export type MyRouteProps = RouteProps & { routes: any };

function renderRoutes<T>(routes: T, layoutProps: T) {
    return (
        <Switch>
            {
                _.map(routes, (v, k) => {
                    const { component: Component, path, exact, routes } = v;
                    return (
                        <Route<MyRouteProps>
                            key={path}
                            render={(props) => {
                                const match = { ...props.match };
                                const newprops = { ...props, ...layoutProps };
                                match['routes'] = routes;
                                return <Component {...newprops} match={match} />;
                            }}
                            path={path}
                            exact={exact}
                            routes={routes}
                        />
                    );
                })
            }
        </Switch >
    );

}
export { renderRoutes };