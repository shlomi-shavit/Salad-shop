import React from 'react';
import classes from './bowl.module.scss';
import { useSelector } from 'react-redux';

const Bowl = () => {

    const saladStore = useSelector(state => state.saladReducer);
    const saldeStoreExist = Object.keys(saladStore).length;

    const SaladIngridiantsElements =
        saldeStoreExist ?
            Object.entries(saladStore.salad_ingridiants).map(ingridiant => {
                return (
                    <div key={ingridiant[0]} className={classes.[ingridiant[0]]}>
                        {ingridiant[0]}
                    </div>
                )
            })
            : ''

    return (
        <div className={classes.bowl}>
            <div className={classes.ingridiants}>
                {SaladIngridiantsElements}
            </div>
        </div>
    )
};

export default Bowl;