import React, { useState } from 'react';
import { Link } from "react-router-dom";
import classes from './shop.module.scss'
// Json
import AllIngridiantsJson from '../../json/salad.json';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { saladDetails } from "../../redux/actions";

const Shop = () => {

    // Fetch data
    const AllIngridiants = AllIngridiantsJson.items;


    // Redux
    const dispatch = useDispatch()
    const saladStore = useSelector(state => state.saladReducer)
    const saldeStoreExist = Object.keys(saladStore).length;

    const [totalIngridiants, setTotalIngridiants] = useState(saldeStoreExist ? saladStore.salad_ingridiants : []);
    let [totalPrice, setTotalPrice] = useState(saldeStoreExist ? saladStore.price : 0);
    const disabledBtnClass = Object.keys(totalIngridiants).length ? '' : classes.disabled;

    // Add Ingridiants & price
    const addIngredient = (ingridiant) => {
        const ingridiantAmount = parseInt((totalIngridiants[ingridiant] || 0)) + 1;
        const ingridiantPrice = AllIngridiants.find(ing => ing.name === ingridiant).price;

        totalIngridiants[ingridiant] = [ingridiantAmount, parseFloat(ingridiantAmount * ingridiantPrice).toFixed(2)];
        setTotalIngridiants({ ...totalIngridiants });

        totalPrice += AllIngridiants.find(ing => ing.name === ingridiant).price;
        setTotalPrice(parseFloat(totalPrice.toFixed(2)));
        summary();
    }

    // Remove Ingridiants & price
    const removeIngredient = (ingridiant) => {
        if (totalIngridiants[ingridiant][0] > 0) {

            const ingridiantAmount = parseInt((totalIngridiants[ingridiant] || 0)) - 1;
            const ingridiantPrice = AllIngridiants.find(ing => ing.name === ingridiant).price;

            totalIngridiants[ingridiant] = [ingridiantAmount, parseFloat(totalIngridiants[ingridiant][1] - ingridiantPrice).toFixed(2)];

            if (totalIngridiants[ingridiant][0] <= 0) {
                delete totalIngridiants[ingridiant]
            }
            setTotalIngridiants({ ...totalIngridiants });

            totalPrice -= AllIngridiants.find(ing => ing.name === ingridiant).price;
            setTotalPrice(parseFloat(totalPrice.toFixed(2)));

            summary();
        }
    }

    const summary = () => {
        const orderSummary = {
            salad_ingridiants: totalIngridiants,
            price: totalPrice
        }
        dispatch(saladDetails(orderSummary));
    }

    // Ingredients list elements
    const AllIngridiantsElements = AllIngridiants.map(ingridiant => {
        return (
            <tr key={ingridiant.name} onClick={() => addIngredient(ingridiant.name)}>
                <td>
                    {ingridiant.name}
                    {totalIngridiants[ingridiant.name]
                        ?
                        <span> ({totalIngridiants[ingridiant.name][0]})</span>
                        : ''}
                </td>
                <td>{ingridiant.price}$</td>
            </tr>
        )
    })

    // Selected Ingredients list elements
    const SelectedIngridiantsElements =
        Object.keys(totalIngridiants).length !== 0 ?
            <ul>
                {Object.entries(totalIngridiants).map(ingridiant => {
                    return (
                        totalIngridiants[ingridiant[0]][0] ?
                            <li key={ingridiant}>
                                {totalIngridiants[ingridiant[0]][0]} {ingridiant[0]}
                                <span>{`(${totalIngridiants[ingridiant[0]][1]}$)`}</span>
                                <div className={classes.arrows}>
                                    <div onClick={() => addIngredient(ingridiant[0])}>▲</div>
                                    <div onClick={() => removeIngredient(ingridiant[0])}>▼</div>
                                </div>
                            </li> : ''
                    )
                })}
            </ul>
            : <div className={classes.empty}>Select ingredients</div>;

    return (
        <div className={classes.page_wrapper}>

            <div className={classes.content}>
                <section className={classes.ingridiant_list}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredients</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllIngridiantsElements}
                        </tbody>
                    </table>
                </section>

                <section className={classes.summary_wrapper}>
                    <div className={classes.selected_ingridiant_list}>
                        {SelectedIngridiantsElements}
                    </div>
                    <div className={classes.total_price}>Total: {totalPrice}$</div>
                </section>
            </div>

            <div className={classes.buttons}>
                <Link className={classes.back} onClick={() => summary()} to="/"> <span>&#xab;</span> back</Link>
                <Link className={`${classes.btn} ${disabledBtnClass}`} onClick={() => summary()} to="/checkout">Cheakout</Link>
            </div>

        </div>
    )
};

export default Shop;