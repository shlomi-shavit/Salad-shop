import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages components
import HomePage from '../components/home/home';
import ShopPage from '../components/shop/shop';
import CheckoutPage from '../components/checkout/checkout';

const Routes = () => {

    const saladStore = useSelector(state => state.saladReducer);
    const StoreExist = Object.keys(saladStore).length;

    return (
        <Switch>

            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route render={() => (StoreExist ? <CheckoutPage /> : <Redirect to="/" />)} />

        </Switch>
    );
};

export default Routes;
