const userDetail = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DETAILS':
            return state = state = action.payload;
        default:
            return state;
    }
}

export default userDetail;