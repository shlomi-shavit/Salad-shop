import React from 'react';
import { useHistory } from "react-router-dom";    // const history = useHistory();
import classes from './popup.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, saladDetails } from "../../redux/actions";

const Popup = ({ domRef, onClose }) => {

    const saladDetailsReducer = useSelector(state => state.saladReducer);
    const userDetailsReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    let history = useHistory();

    const SaladDetailsElements = Object.entries(saladDetailsReducer.salad_ingridiants).map(ingridiant => {
        return (
            <tr key={ingridiant}>
                <td>{ingridiant[1][0]} {ingridiant[0]}</td>
                <td>{ingridiant[1][1]}$</td>
            </tr>
        )
    })

    const closePopup = () => {
        dispatch(userDetails({}));
        dispatch(saladDetails({}));
        onClose();
        history.push("/");
    }

    return (
        <div ref={domRef} className={classes.popup}>
            <section>

                <div onClick={() => closePopup()} className={classes.close_btn}>✕</div>

                <h3>Thank you {userDetailsReducer.name}</h3>
                Your delivery is on its way.
                <br /><br />

                Order details:
                <table>
                    <tbody>
                        <tr>
                            <th>Ingredients</th>
                            <th>Price</th>
                        </tr>
                        {SaladDetailsElements}
                    </tbody>
                </table>
                <div className={classes.total_price}>Total: {saladDetailsReducer.price}$</div>

            </section>
            <div onClick={onClose} className={classes.close_area}></div>
        </div>
    )
};

export default Popup;