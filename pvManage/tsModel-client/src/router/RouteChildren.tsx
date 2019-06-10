import React from 'react';
import { renderRoutes } from 'router/renderRoutes';
import { Switch, Route, RouteProps, RouteComponentProps } from 'react-router-dom';

function RouteChildren(props: RouteComponentProps): React.ReactNode {
    const {
        match,
    } = props;
    const routes = match['routes'] || [];
    return renderRoutes(routes, {});
}
export { RouteChildren };