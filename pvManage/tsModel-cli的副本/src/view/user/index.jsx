import React from 'react';

import { Switch , Route } from 'react-router-dom';
import { UserList } from './userList';
import { UserForm } from './userForm';

class UserView extends React.Component {
    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={match.path} exact component={UserList} />
                <Route
                    path={`${match.path}/new`}
                    render={props => {
                        return <UserForm {...props} action="new" />;
                    }}
                />
                <Route
                    path={`${match.path}/edit/:id`}
                    render={props => {
                        return <UserForm {...props} action="edit" />;
                    }}
                />
            </Switch>
        );
    }
}

export { UserView };

