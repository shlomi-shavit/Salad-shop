const saladReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SALAD_DETAILS':
            return state = state = action.payload;
        default:
            return state;
    }
}
export default saladReducer;