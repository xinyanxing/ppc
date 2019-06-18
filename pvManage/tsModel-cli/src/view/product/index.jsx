import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { ProductList } from './productList';
import { ProductForm } from './productForm';

class ProductView extends React.Component {
    render() {
        const { match } = this.props;

        return (
            <Switch>
                <Route path={match.path} exact component={ProductList} />
                <Route
                    path={`${match.path}/new`}
                    render={props => {
                        return <ProductForm {...props} action="new" />;
                    }}
                />
                <Route
                    path={`${match.path}/edit/:id`}
                    render={props => {
                        return <ProductForm {...props} action="edit" />;
                    }}
                />
            </Switch>
        );
    }
}

export { ProductView };
