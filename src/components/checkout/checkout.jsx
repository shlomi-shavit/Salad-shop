import React, { useState } from 'react';
import classes from './checkout.module.scss'
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from "../../redux/actions";
// Component
import Popup from '../popup/popup';

const Ceackout = () => {

    // form
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm({
        mode: "all"
    });

    const onSubmit = formValues => {
        dispatch(userDetails(formValues));
        setShowPopup(true)
    }
    const errorStyle = (field) => {
        return field ? classes.error : '';
    }
    const nodeRef = React.useRef(null)

    const [showPopup, setShowPopup] = useState(false);

    const saladDetailsReducer = useSelector(state => state.saladReducer)

    const SaladDetailsElements = Object.entries(saladDetailsReducer.salad_ingridiants).map(ingridiant => {
        return (
            <tr key={ingridiant}>
                <td>{ingridiant[1][0]} {ingridiant[0]}</td>
                <td>{ingridiant[1][1]}$</td>
            </tr>
        )
    })

    return (
        <div className={classes.page_wrapper}>

            <div className={classes.content}>
                <section>
                    <h3>Order description:</h3>

                    <div className={classes.ingridiant_list}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ingredients</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SaladDetailsElements}
                            </tbody>
                        </table>
                    </div>

                    <div className={classes.total_price}>Total Price: {saladDetailsReducer.price}$</div>
                </section>

                <section className={classes.form_wrapper}>
                    User details:

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div>
                            <label htmlFor='name'>
                                <input
                                    className={errorStyle(errors.name)}
                                    placeholder='Name'
                                    name='name'
                                    id='name'
                                    ref={register({
                                        required: 'Enter your name',
                                        pattern: {
                                            value: /^[a-zA-Z\-\u0590-\u05FF''())/ ]+$/,
                                            message: 'Invalid name'
                                        }
                                    })}
                                />
                                <div></div>
                            </label>
                            <div className={classes.error_message}>
                                {errors.name ? errors.name && errors.name.message : null}
                            </div>
                        </div>

                        <div>
                            <label htmlFor='email'>
                                <input
                                    className={errorStyle(errors.email)}
                                    placeholder='Mail'
                                    name='email'
                                    id='email'
                                    ref={register({
                                        required: 'Enter email',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email'
                                        }
                                    })}
                                />
                            </label>
                            <div className={classes.error_message}>
                                {errors.email ? errors.email && errors.email.message : null}
                            </div>
                        </div>

                        <div>
                            <label htmlFor='message'>
                                <textarea
                                    name='Message'
                                    id='message'
                                    maxLength='100'
                                    ref={register({
                                        // required: 'Enter message',
                                        pattern: {
                                            // value: /^[a-zA-Z\-\u0590-\u05FF''())/ ]+$/,
                                            value: /^[a-zA-Z0-9%+-?!()' '"*\-\u0590-\u05FF\n]+$/, // /^[a-zA-Z0-9+-?!()'"*]{0,10}\s*$/i,
                                            message: 'Invalid text'
                                        }
                                    })}
                                />
                            </label>
                            {errors.message ? <div className={classes.error_message}>{errors.message && errors.message.message}</div> : null}
                        </div>

                        <button className={classes.btn} disabled={Object.keys(errors).length !== 0} type='submit'>
                            Order salad
                        </button>
                    </form>

                </section>
            </div>

            <div className={classes.buttons}>
                <Link className={classes.back} to="/shop"> <span>&#xab;</span> back</Link>
            </div>

            <CSSTransition
                nodeRef={nodeRef}
                in={showPopup}
                timeout={200}
                unmountOnExit>

                <Popup domRef={nodeRef} onClose={() => setShowPopup(false)} />

            </CSSTransition>

        </div>
    )
};

export default Ceackout;
