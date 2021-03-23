import React from 'react';
import { Link } from "react-router-dom";
import classes from './home.module.scss';

const Home = () => {

    return (
        <div className={classes.page_wrapper}>

            <div className={classes.content}>
                <section>
                    <h1>Fast, Fresh, Affordable</h1>
                    The Salad Shop brings you an affordable,
                    healthy alternative to fast food,<br />
                    knowing that your time is valuable and you care about what you put in your body.<br />
                    We are a take-out restaurant,<br />
                    allowing you the flexibility of eating at work, home,<br />
                    or one of your other favorite locations.
                    <br /><br />
                    Choose from a make-it-yourself salad bar or convenient pre-made salads when you order online.
                    Add one of our daily soups, and you're set!
                </section>
            </div>
            <Link className={classes.btn} to="/shop">Order salad</Link>
        </div>
    )
};

export default Home;
