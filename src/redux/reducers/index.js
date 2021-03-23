import { combineReducers } from 'redux';
import saladDetails from "./salad-details";
import userDetails from "./user-detail";

const allReducers = combineReducers({
    saladReducer: saladDetails,
    userReducer: userDetails
});

export default allReducers;