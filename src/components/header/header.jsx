import React from 'react';
import { Link } from "react-router-dom";
import classes from './header.module.scss';
import logo from '../../images/salad-logo.png';

const Header = () => {

    return (
        <header className={classes.Header}>
            <Link to="/">
                Salad Shop
                <img className={classes.logo} src={logo} alt="Logo" />
            </Link>
        </header>
    )
};

export default Header;